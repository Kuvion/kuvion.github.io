#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""extract_payloads.py — первичная загрузка payload'ов слоя kuvion-data.

Самодостаточный скрипт (только stdlib), запуск локально и в GitHub
Actions (см. .github/workflows/data-layer.yml):

  python3 data/extract_payloads.py --root <корень репозитория>

Что делает: если data/payloads/*.js ещё нет — собирает их из секций
тестовых данных, ВСТРОЕННЫХ в страницы сайта (состояние до применения
data/patch_site.py). Константы секций переносятся дословно (байт-в-байт),
поэтому данные совпадают с теми, что раньше жили в страницах:

  home      <- /            секция «тестовые данные»
  catalog   <- /catalog/    секция «тестовые данные»
  title     <- /title/      «тестовые данные» + «данные страницы тайтла…»
  colls     <- /title/      «ПОДБОРКИ: общие данные (Kuvion)»
  manga     <- /manga/      «тестовые данные раздела «Манга»»
  person    <- /person/     «тестовые данные» + «данные страницы персоны»

Дальше patch_site.py собирает из payload'ов /assets/kuvion-data.js и
заменяет секции страниц shim'ами. После применения слоя секции исчезают,
поэтому экстрактор нужен один раз: если payload'ы уже есть, он ничего
не делает (править данные дальше нужно прямо в payload-файлах).
"""
import os
import re
import sys

# ------------------------------------------------------- разбор JS (как в patch_site.py)
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


def find_def(body, name):
    """const NAME=…; либо function NAME(…){…} — как remove_def в patch_site.py."""
    return find_const(body, name) or find_function(body, name)


BANNER = re.compile(r'^/\* -{5,} (.+?)\s*-+\s*(\*/)?\s*$', re.M)


def script_blocks(html):
    return [(m.start(1), m.end(1), m.group(1))
            for m in re.finditer(r'<script\b[^>]*>(.*?)</script>', html, re.S)]


def sections(body):
    bans = [(m.group(1).strip(), m.start(0), m.end(0)) for m in BANNER.finditer(body)]
    out = {}
    for i, (t, a, e) in enumerate(bans):
        if t in out:
            continue
        end = bans[i + 1][1] if i + 1 < len(bans) else len(body)
        out[t] = (a, end)
    return out


def section_text(html, sec_name):
    """Текст секции (вместе с баннером) по её названию — из любого script-блока."""
    for (_cs, _ce, body) in script_blocks(html):
        secs = sections(body)
        if sec_name in secs:
            s, e = secs[sec_name]
            return body[s:e]
    return None


# --------------------------------------------------------------------- описание пространств
CDN_LINE = "const CDN='https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/';"

S_TV = 'тестовые данные'
S_MANGA = 'тестовые данные раздела «Манга»'
S_PERSON2 = 'данные страницы персоны'
S_TITLE2 = 'данные страницы тайтла («Атака титанов»)'
S_COLLS = 'ПОДБОРКИ: общие данные (Kuvion)'

# (пространство, роут страницы, [(секция, [имена констант]), …], маппинг return)
# Маппинги = поля, которые читают shim'ы patch_site.py (KUV.<поле>).
SPACES = [
    ('home', '', [(S_TV, ['STATUS', 'T', 'TITLES', 'HERO', 'CONTINUE', 'ROWS'])],
     'status:STATUS,titles:TITLES,hero:HERO,cont:CONTINUE,rows:ROWS'),
    ('catalog', 'catalog', [(S_TV, ['STATUS', 'T', 'TITLES'])],
     'status:STATUS,titles:TITLES'),
    ('title', 'title', [
        (S_TV, ['STATUS', 'T', 'TITLES']),
        (S_TITLE2, ['TP', 'STILLS', 'CHARS', 'CAST_PEOPLE', 'CHRONOLOGY',
                    'SEASONS', 'SIMILAR', 'POPULAR'])],
     'status:STATUS,titles:TITLES,tp:TITLES.aot,stills:STILLS,chars:CHARS,'
     'castPeople:CAST_PEOPLE,chronology:CHRONOLOGY,seasons:SEASONS,'
     'similar:SIMILAR,popular:POPULAR'),
    ('colls', 'title', [(S_COLLS, ['COLL_KEY', 'COLL_POSTERS', 'COLL_DEMO', 'COLL_SEED'])],
     'key:COLL_KEY,posters:COLL_POSTERS,demo:COLL_DEMO,seed:COLL_SEED'),
    ('manga', 'manga', [(S_MANGA, ['STATUS', 'STATUS_FULL', 'M', 'TITLES'])],
     'now:NOW_ISO,status:STATUS,statusFull:STATUS_FULL,titles:TITLES'),
    ('person', 'person', [
        (S_TV, ['PT', 'TITLES', 'STATUS']),
        (S_PERSON2, ['PERSONS'])],
     'status:STATUS,titles:TITLES,persons:PERSONS'),
]


def main():
    root = '.'
    if '--root' in sys.argv:
        root = sys.argv[sys.argv.index('--root') + 1]
    payloads_dir = os.path.join(root, 'data', 'payloads')
    os.makedirs(payloads_dir, exist_ok=True)

    todo = [sp for sp in SPACES
            if not os.path.exists(os.path.join(payloads_dir, sp[0] + '.js'))]
    if not todo:
        print('data/payloads/*.js уже есть — извлечение не нужно.')
        return

    pages = {}  # роут -> html
    for ns, route, rules, mapping in todo:
        if route not in pages:
            path = os.path.join(root, route, 'index.html') if route else os.path.join(root, 'index.html')
            pages[route] = open(path, encoding='utf-8').read()
        html = pages[route]

        defs = []
        for sec_name, names in rules:
            sec = section_text(html, sec_name)
            assert sec, f'{route or "/"}: секция «{sec_name}» не найдена'
            for n in names:
                span = find_def(sec, n)
                assert span, f'{route or "/"}: в секции «{sec_name}» нет const {n}'
                defs.append(sec[span[0]:span[1]])

        # манга: «сегодня» демо — строка ISO из const NOW=new Date('…')
        if ns == 'manga':
            m = re.search(r"NOW\s*=\s*new Date\('([^']+)'\)", section_text(html, S_MANGA))
            assert m, 'manga: не найден якорь NOW=new Date(…)'
            mapping = mapping.replace('NOW_ISO', "'%s'" % m.group(1))

        payload = ('KuvionData._db.%s=(function(){\n'
                   '"use strict";\n'
                   '%s\n'
                   '%s\n'
                   'return {%s};\n'
                   '})();') % (ns, CDN_LINE, '\n'.join(defs), mapping)
        out = os.path.join(payloads_dir, ns + '.js')
        open(out, 'w', encoding='utf-8').write(payload)
        print(f'data/payloads/{ns}.js: {len(payload)} байт ({len(defs)} констант)')

    print('Извлечение завершено: %d пространств.' % len(todo))


if __name__ == '__main__':
    main()
