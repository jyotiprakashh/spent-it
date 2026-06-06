One transaction line: tinted category glyph, name/note, signed amount (income green, expense red).

\`\`\`jsx
<TransactionRow tx={{category:'Groceries',icon:'groceries',color:'#00d09c',note:'BigBasket',amount:1240,type:'expense'}} onClick={open} />
\`\`\`

Render inside a non-padded Card or section list.
