#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""patch_site.py — слой данных kuvion-data для продакшен-репозитория.

Самодостаточный скрипт (зависимостей нет, только stdlib). Запускается
локально и в GitHub Actions (см. .github/workflows/):

  python3 data/patch_site.py --root <корень репозитория>

Что делает (идемпотентно — повторный запуск ничего не меняет):
  1. Собирает /assets/kuvion-data.js из data/core.js + data/payloads/*.js:
     ядро KuvionData (демо-база + API-адаптер), пространства страниц,
     одинаковые тела заменяются алиасами (_db.notifs=_db.home).
  2. В каждой странице (index.html по роутам) заменяет секции тестовых
     данных («тестовые данные», «данные страницы …», «ПОДБОРКИ: общие
     данные») на shim: те же имена констант, но значения — из
     KuvionData.page('<ключ>'). Код страниц не меняется.
  3. Вставляет <script src="/assets/kuvion-data.js"></script> перед
     главным скриптом (на тайтле/подборках/профиле — перед блоком
     «ПОДБОРКИ»).

Источник данных — ЕДИНЫЙ: data/core.js и data/payloads/ генерируются
из db.js (scripts/kuvion-data/ в проекте). Править данные = обновить
payload-файл и запушить: Actions пересоберёт сайт автоматически.
"""
import os
import re
import sys

# ---------------------------------------------------------------- разметка
BANNER = re.compile(r'^/\* -{5,} (.+?)\s*-+\s*(\*/)?\s*$', re.M)

S_TV = 'тестовые данные'
S_MANGA = 'тестовые данные раздела «Манга»'
S_PERSON2 = 'данные страницы персоны'
S_TITLE2 = 'данные страницы тайтла («Атака титанов»)'
S_COLLS = 'ПОДБОРКИ: общие данные (Kuvion)'

CAT_SHIM = 'const STATUS=KUV.status,TITLES=KUV.titles;'
HOME_SHIM = 'const STATUS=KUV.status,TITLES=KUV.titles,HERO=KUV.hero,CONTINUE=KUV.cont,ROWS=KUV.rows;'
TITLE2_SHIM = ('const TP=KUV.tp,STILLS=KUV.stills,CHARS=KUV.chars,CAST_PEOPLE=KUV.castPeople,'
               'CHRONOLOGY=KUV.chronology,SEASONS=KUV.seasons,SIMILAR=KUV.similar,POPULAR=KUV.popular;')
COLLS_SHIM = ("const KVCL=KuvionData.page('colls');\n"
              'const COLL_KEY=KVCL.key,COLL_POSTERS=KVCL.posters,COLL_DEMO=KVCL.demo,COLL_SEED=KVCL.seed;')

# роут -> (пространства для алиасов/сборки, правила секций)
PAGES = {
    '': (['home'], [(S_TV, ['STATUS', 'T', 'TITLES', 'HERO', 'CONTINUE', 'ROWS'], 'home',
                     "const KUV=KuvionData.page('home');\n" + HOME_SHIM)]),
    'catalog': (['catalog'], [(S_TV, ['STATUS', 'T', 'TITLES'], 'catalog',
                               "const KUV=KuvionData.page('catalog');\n" + CAT_SHIM)]),
    'title': (['title', 'colls'], [
        (S_TV, ['STATUS', 'T', 'TITLES'], 'title', "const KUV=KuvionData.page('title');\n" + CAT_SHIM),
        (S_TITLE2, ['TP', 'STILLS', 'CHARS', 'CAST_PEOPLE', 'CHRONOLOGY', 'SEASONS', 'SIMILAR', 'POPULAR'],
         'title', TITLE2_SHIM),
        (S_COLLS, ['COLL_KEY', 'COLL_POSTERS', 'COLL_DEMO', 'COLL_SEED'], 'colls', COLLS_SHIM)]),
    'manga': (['manga'], [(S_MANGA, ['NOW', 'STATUS', 'STATUS_FULL', 'M', 'TITLES'], 'manga',
                           "const KUV=KuvionData.page('manga');\n"
                           'const NOW=new Date(KUV.now),STATUS=KUV.status,STATUS_FULL=KUV.statusFull,'
                           'TITLES=KUV.titles;')]),
    'mylist': (['mylist'], [(S_TV, ['STATUS', 'T', 'TITLES'], 'mylist',
                             "const KUV=KuvionData.page('mylist');\n" + CAT_SHIM)]),
    'collections': (['collections', 'colls'], [
        (S_TV, ['STATUS', 'T', 'TITLES'], 'collections',
         "const KUV=KuvionData.page('collections');\n" + CAT_SHIM),
        (S_COLLS, ['COLL_KEY', 'COLL_POSTERS', 'COLL_DEMO', 'COLL_SEED'], 'colls', COLLS_SHIM)]),
    'collections/new': (['collnew'], [(S_TV, ['STATUS', 'T', 'TITLES'], 'collnew',
                                       "const KUV=KuvionData.page('collnew');\n" + CAT_SHIM)]),
    'schedule': (['schedule'], [(S_TV, ['STATUS', 'T', 'TITLES'], 'schedule',
                                 "const KUV=KuvionData.page('schedule');\n" + CAT_SHIM)]),
    'search': (['search'], [(S_TV, ['STATUS', 'T', 'TITLES', 'HERO', 'CONTINUE', 'ROWS'], 'search',
                             "const KUV=KuvionData.page('search');\n" + HOME_SHIM)]),
    'notifications': (['notifs'], [(S_TV, ['STATUS', 'T', 'TITLES', 'HERO', 'CONTINUE', 'ROWS'], 'notifs',
                                    "const KUV=KuvionData.page('notifs');\n" + HOME_SHIM)]),
    'person': (['person'], [
        (S_TV, ['PT', 'TITLES', 'STATUS'], 'person',
         "const KUV=KuvionData.page('person');\nconst TITLES=KUV.titles,STATUS=KUV.status;"),
        (S_PERSON2, ['PERSONS'], 'person', 'const PERSONS=KUV.persons;')]),
    'profile': (['profile', 'colls'], [
        (S_TV, ['STATUS', 'T', 'TITLES'], 'profile',
         "const KUV=KuvionData.page('profile');\n" + CAT_SHIM),
        (S_COLLS, ['COLL_KEY', 'COLL_POSTERS', 'COLL_DEMO', 'COLL_SEED'], 'colls', COLLS_SHIM)]),
    'settings': (['settings'], [(S_TV, ['STATUS', 'T', 'TITLES'], 'settings',
                                 "const KUV=KuvionData.page('settings');\n" + CAT_SHIM)]),
    'plus': (['plus'], [(S_TV, ['STATUS', 'T', 'TITLES', 'HERO', 'CONTINUE', 'ROWS'], 'plus',
                         "const KUV=KuvionData.page('plus');\n" + HOME_SHIM)]),
}

# уникальные payload'ы (порядок сборки) и алиасы одинаковых пространств
UNIQUE = ['home', 'catalog', 'title', 'colls', 'manga', 'person']
ALIAS_OF = {'notifs': 'home', 'plus': 'home', 'search': 'home',
            'collections': 'catalog', 'mylist': 'catalog', 'schedule': 'catalog',
            'collnew': 'catalog', 'settings': 'catalog', 'profile': 'catalog'}

# плоские имена черновиков -> роуты (для ссылок внутри данных)
FLAT_ROUTES = [
    ('kuvion-draft-v4.html', ''), ('kuvion-catalog-v1.html', 'catalog'),
    ('kuvion-title-v2.html', 'title'), ('kuvion-manga-v1.html', 'manga'),
    ('kuvion-mylist-v1.html', 'mylist'), ('kuvion-collections-v1.html', 'collections'),
    ('kuvion-coll-new-v1.html', 'collections/new'), ('kuvion-schedule-v1.html', 'schedule'),
    ('kuvion-search-v1.html', 'search'), ('kuvion-notifs-v1.html', 'notifications'),
    ('kuvion-person-v1.html', 'person'), ('kuvion-profile-v1.html', 'profile'),
    ('kuvion-settings-v1.html', 'settings'), ('kuvion-plus-v1.html', 'plus'),
    ('kuvion-404.html', '404.html'),
]

SHIM_MARK = 'данные страницы — из единого слоя kuvion-data'
SRC_TAG = '<script src="/assets/kuvion-data.js"></script>'

# ------------------------------------------------------- разбор JS (kvlib)
def _skip_string(body, i):
    q = body[i]
    i += 1
    while i < len(body):
        if body[i] == '\\':
            i += 2
            continue
        if body[i] == q:
            return i + 1
        i += 1
    return i


def _skip_comment(body, i):
    if body.startswith('//', i):
        e = body.find('\n', i)
        return (e + 1) if e != -1 else len(body)
    e = body.find('*/', i + 2)
    return (e + 2) if e != -1 else len(body)


def _balanced(body, m, end_char):
    i = m.end()
    depth = 0
    while i < len(body):
        c = body[i]
        if c in '\'"`':
            i = _skip_string(body, i)
            continue
        if c == '/' and body.startswith('/*', i):
            i = _skip_comment(body, i)
            continue
        if c == '/' and body.startswith('//', i):
            i = _skip_comment(body, i)
            continue
        if c in '{[(':
            depth += 1
        elif c in '}])':
            depth -= 1
            if depth == 0 and end_char == '}':
                return (m.start(), i + 1)
        elif depth == 0 and c == end_char:
            return (m.start(), i + 1)
        i += 1
    return None


def find_const(body, name):
    m = re.search(r'(?<![\w$])(?:const|let|var)\s+%s\s*=' % re.escape(name), body)
    return _balanced(body, m, ';') if m else None


def find_function(body, name):
    m = re.search(r'(?<![\w$.])function\s+%s\s*\([^)]*\)' % re.escape(name), body)
    return _balanced(body, m, '}') if m else None


def remove_def(body, name, floor=0):
    span = find_const(body, name) or find_function(body, name)
    assert span, f'не найдено определение {name}'
    s, e = span
    ls = body.rfind('\n', 0, s) + 1
    while ls > floor:
        prev_le = body.rfind('\n', 0, ls - 1) + 1
        st = body[prev_le:ls - 1].strip()
        if not st or st.startswith('//'):
            ls = prev_le
            continue
        break
    cstart = body.rfind('/*', floor, s)
    if cstart != -1:
        tail = body[cstart:s]
        cend = tail.find('*/')
        if cend != -1 and tail[cend + 2:].strip() == '':
            ls = min(ls, cstart)
            while ls > floor:
                prev_le = body.rfind('\n', 0, ls - 1) + 1
                if not body[prev_le:ls - 1].strip():
                    ls = prev_le
                    continue
                break
    ls = max(ls, floor)
    ee = e
    while ee < len(body) and body[ee] in '\r\n':
        ee += 1
    return body[:ls] + body[ee:], (ls, ee)


def script_blocks(html):
    return [(m.start(1), m.end(1), m.group(1))
            for m in re.finditer(r'<script\b[^>]*>(.*?)</script>', html, re.S)]


def sections(body):
    bans = [(m.group(1).strip(), m.start(0), m.end(0)) for m in BANNER.finditer(body)]
    out = {}
    for i, (t, a, e) in enumerate(bans):
        end = bans[i + 1][1] if i + 1 < len(bans) else len(body)
        out.setdefault(t, (a, end))
    return out


def banner_end(body, start):
    e = body.find('*/', start)
    return (e + 2) if e != -1 else start


# ------------------------------------------------------------- сборка ассета
def build_asset(root):
    data_dir = os.path.join(root, 'data')
    core = open(os.path.join(data_dir, 'core.js'), encoding='utf-8').read().rstrip() + '\n'
    payloads = {}
    for ns in UNIQUE + sorted(ALIAS_OF):
        p = os.path.join(data_dir, 'payloads', ns + '.js')
        if os.path.exists(p):
            payloads[ns] = open(p, encoding='utf-8').read().rstrip()

    data_hdr = ('/* Kuvion — слой данных: демо-база всего сайта + API-адаптер KuvionData.\n'
                '   ЕДИНЫЙ ИСТОЧНИК ДЕМО-ДАННЫХ: scripts/kuvion-data/db.js (сборка —\n'
                '   assemble_db.py -> emit.js -> patch.py -> build_prod.py).\n'
                '   Боевой бэкенд: контракты и миграция — в шапке ядра KuvionData ниже.\n'
                '   Править данные здесь нельзя — только через scripts/kuvion-data/. */\n"use strict";\n')
    body = [data_hdr, core, '']
    for ns in UNIQUE:
        body.append(f'/* ===== пространство: {ns} ===== */')
        body.append(payloads[ns])
        body.append('')
    if ALIAS_OF:
        body.append('/* одинаковые пространства — алиасы (данные те же) */')
        # порядок алиасов — по порядку страниц (как в сборке проекта)
        order = []
        for route, (nss, _rules) in PAGES.items():
            for ns in nss:
                if ns in ALIAS_OF and ns not in order:
                    order.append(ns)
        for ns in order:
            body.append(f'KuvionData._db.{ns}=KuvionData._db.{ALIAS_OF[ns]};')
        body.append('')
    text = '\n'.join(body)

    def rw(m):
        flat = m.group(0)
        for name, route in FLAT_ROUTES:
            if name == flat:
                return ('/' + route + '/') if route else '/'
        return flat
    text = re.sub(r'kuvion-(?:draft-v4|catalog-v1|title-v2|manga-v1|mylist-v1|collections-v1|'
                  r'coll-new-v1|schedule-v1|search-v1|notifs-v1|person-v1|profile-v1|'
                  r'settings-v1|plus-v1|404)\.html', rw, text)

    out = os.path.join(root, 'assets', 'kuvion-data.js')
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, 'w', encoding='utf-8').write(text)
    return len(text)


# ------------------------------------------------------------ патчинг страниц
def patch_page(root, route, rules):
    path = os.path.join(root, route, 'index.html') if route else os.path.join(root, 'index.html')
    html = open(path, encoding='utf-8').read()
    orig = html
    changed = []

    for (sec_name, removals, api_key, shim_code) in rules:
        done = False
        for (cs, ce, body) in script_blocks(html):
            secs = sections(body)
            if sec_name not in secs:
                continue
            s, e = secs[sec_name]
            sec = body[s:e]
            if SHIM_MARK in sec:
                done = True
                break
            floor = banner_end(sec, 0)
            new_sec = sec
            for name in removals:
                new_sec, _ = remove_def(new_sec, name, floor)
            head = (f'\n/* {SHIM_MARK} (DATA-ENTRY).\n'
                    f'   Демо-данные правятся в scripts/kuvion-data/db.js, не здесь.\n'
                    f'   Боевой API: KuvionData.api.{api_key}().then(данные => {{ … }})'
                    f' — см. KVUION-DATA-блок. */\n')
            rest = new_sec[floor:].strip('\n')
            tail = ('\n\n' + rest) if rest else ''
            new_sec = new_sec[:floor] + head + shim_code + '\n' + tail
            html = html[:cs] + body[:s] + new_sec + body[e:] + html[ce:]
            changed.append(sec_name.split()[0])
            done = True
            break
        assert done, f'{route or "/"}: секция «{sec_name}» не найдена'

    if SRC_TAG not in html:
        blocks = list(re.finditer(r'<script\b[^>]*>.*?</script>', html, re.S))
        target = None
        for m in blocks:
            if 'ПОДБОРКИ: общие данные' in m.group(0):
                target = m
                break
        if target is None:
            # главный скрипт = блок с секцией «иконки» (в проде он может быть
            # разрезан выносом движков — берём первую часть)
            for m in blocks:
                if re.search(r'/\* -{5,} иконки', m.group(0)):
                    target = m
                    break
        assert target is not None, f'{route or "/"}: не найден главный скрипт'
        html = html[:target.start()] + SRC_TAG + '\n\n' + html[target.start():]
        changed.append('src-тег')

    if html != orig:
        open(path, 'w', encoding='utf-8').write(html)
    return changed


def main():
    root = '.'
    if '--root' in sys.argv:
        root = sys.argv[sys.argv.index('--root') + 1]
    n = build_asset(root)
    print(f'assets/kuvion-data.js: {n} байт')
    for route, (_nss, rules) in PAGES.items():
        changed = patch_page(root, route, rules)
        print(f'{("/" + route) if route else "/":20s} {"+" .join(changed) if changed else "без изменений"}')
    print('Готово.')


if __name__ == '__main__':
    main()
