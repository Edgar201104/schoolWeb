# St Paul Methodist School Timor-Leste website

## Open it
Double-click `index.html`, or in Visual Studio Code install the **Live Server** extension, right-click `index.html` and choose **Open with Live Server**.

## Files
- `index.html`: all the text and sections (About, Levels, Admissions, News, Gallery, Contact, portal login box).
- `css/style.css`: colors (top of file, `:root`), fonts and layout.
- `js/main.js`: menu, contact form, portal login, uploads and downloads.
- `images/`: logo and photos. Replace a file with the same name to change a picture.

## Things to fill in
Search `index.html` for `todo` to find every yellow `[bracket]` placeholder:
principal names, address, phone, email, office hours, fees, news and events.
In `js/main.js`, set `SCHOOL_EMAIL` so the contact form can send email.

## Important: the portal is a demo
Student and parent accounts, passwords and attendance data are written inside `js/main.js`.
Anyone can read them. Do not put real student information in this file.
Before real use, connect a login service and database (for example Supabase or Firebase)
and have a web developer set up server-side rules so a parent can only see their own child.

## Publishing
Upload the whole folder to a web host (for example Netlify, GitHub Pages or any school hosting).
