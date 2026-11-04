<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Questions live as typed data in src/lib/questions/*; there's no backend, so it stays a simple no-login study app.
- Typed equations are graded by src/lib/chem/equation.ts (parse + balance + states); keep its tests green when you change answers.
- GitHub Pages uses the PAGES_BUILD static prerender mode and uploads dist/client; keep fallback files and artifact paths aligned with TanStack Start's client output.
