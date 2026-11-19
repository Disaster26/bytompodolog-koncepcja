s=open('src.html',encoding='utf-8').read()
s=s.replace('{{BADGE_STYLE}}',open('_src/badge_style.part',encoding='utf-8').read().replace('<style>','').replace('</style>',''))
s=s.replace('{{BADGE_LINK}}',open('_src/badge_link.part',encoding='utf-8').read())
open('index.html','w',encoding='utf-8').write(s)
