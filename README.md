# Webová aplikace to-do-manager

Lukáš Kořínek

*2020*

- Webová aplikace - TODO systém - seznam a správa úkolů
- Aplikace napsaná v Node.js (Express.js), MVC, Rest API, Frontend vytvořený v React.js, využívá databázi MongoDB

###### Funkcionality a vlastnosti aplikace:
- Zobrazení úkolů
  - Filtr hotových úkolů
  - Možnost zobrazení výstupu ve formátech HTML a JSON - přepínání formátu parametrem v URL nebo dle vaší volby (zdokumentovat)
  - JSON výstup je určený pro další aplikace, musí tedy mít správný content-type a být validní dle JSON pravidel
- Administrace úkolů - přidání, úprava, smazání, označit jako hotový
- Přihlášení různých uživatelů, zabezpečení administrace úkolů před anonymním přístupem
- Využítí HTML5 nebo JavaScript pro klienta - kontrola formuláře, interakce s uživatelem apod.
- Ochrana proti XSS, SQL injection
- REST API a MVC architektura
