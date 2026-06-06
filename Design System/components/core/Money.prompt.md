Currency typography with tabular numerals and -0.2 tracking. Always render money through this, never raw strings.

\`\`\`jsx
<Money value={84320} currency="INR" size={30} weight={700} />
<Money value={-860} tone="expense" signed />
\`\`\`
