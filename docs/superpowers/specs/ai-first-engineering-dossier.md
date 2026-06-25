# AI-First Engineering — Dossier de référence (source de contenu)

> Source produit pour le pivot. Couvre positionnement, marché, accroche, formules,
> programmes, technologies, cadre réglementaire et feuille de route. Référencé par
> le spec et le plan d'implémentation comme source unique du contenu.

---

## 1. Positionnement & niche

**La niche en une phrase :** Formation à l'ingénierie augmentée par l'IA, destinée
aux équipes de développement qui veulent passer en mode *AI-first* sans sacrifier la
qualité de leur code ni la sécurité de leur production.

**Ce qui la rend défendable :** La quasi-totalité des « formations IA » s'arrêtent à
ChatGPT et au prompt de base — segment saturé, commoditisé. Le segment haut — comment
une équipe technique travaille réellement avec des agents de code en production — est
quasi désert, parce que très peu de formateurs le pratiquent eux-mêmes.

**Le « pourquoi moi » :** Je dirige le développement d'un SaaS en production en mode
100 % AI-first depuis plusieurs années. Je n'écris plus de code « à la main »,
j'orchestre des agents (Claude Code, Cursor), j'automatise des process métier réels
(n8n, OCR par vision), j'opère ma propre infrastructure. J'enseigne ce que je pratique.

**Ce qu'on ne vend PAS (crédibilité) :** orchestration multi-agents = *pattern* à
connaître, pas cœur de maîtrise ; RAG souverain pas au catalogue tant qu'un projet réel
ne tourne pas ; jamais prétendre maîtriser un outil non pratiqué.

## 2. Marché & contexte (pourquoi maintenant)

- Demande structurelle de formation IA, écart fort avec l'offre opérationnelle.
- **Driver réglementaire :** l'AI Act impose un niveau minimal de compétences IA ;
  sanctions nationales applicables dès **août 2026**. Former ses équipes passe de
  « confort » à **obligation juridique** — porte d'entrée commerciale auprès des directions.
- Le marché par le bas (MOOCs, bootcamps 3 j, « formateur prompt ChatGPT ») est saturé.
  → Différenciation = **profondeur technique réelle** + **spécialisation** + éventuelle certif.

## 3. Cibles

- **Acheteur technique :** CTO / Lead dev de PME, scale-up, studio, ESN. Douleur : usage
  anarchique de l'IA, dette technique, pas de méthode, pas de mesure du gain.
- **Sponsor :** Dirigeant / DSI / DRH. Douleur : obligation AI Act, Shadow AI non maîtrisé,
  pas de politique d'usage, doute sur le ROI.
- **Bénéficiaires :** développeurs en activité (aucun prérequis IA, env de dev fonctionnel).
- **100 % B2B intra-entreprise.** CPF/B2C = chantier ultérieur (certif RS/RNCP).

## 4. Accroche (messaging)

- **Titre :** AI-First Engineering. **Sous-titre :** Faites passer votre équipe dev en
  mode IA — sans casser votre prod ni votre qualité.
- **Problème :** Vos devs utilisent déjà l'IA, mais sans méthode. Copier-coller non revu,
  dette technique, failles, aucune mesure du gain. L'obligation AI Act approche (sanctions
  dès août 2026). C'est le *Shadow AI* : partout, sans cadre.
- **Promesse :** En 2 jours, votre équipe passe d'un usage anarchique à une méthode
  d'ingénierie AI-first maîtrisée : livrer plus vite, sans sacrifier la qualité ni ouvrir
  de failles.
- **Pourquoi moi :** Je ne suis pas un consultant qui a lu la doc. Je dirige un SaaS en
  prod 100 % AI-first depuis plusieurs années — j'orchestre. J'enseigne ce que je pratique.
- **Objections :**
  - *« L'IA va remplacer mes devs. »* → Non : elle déplace leur travail vers l'orchestration
    et la revue. La formation porte sur ce nouveau rôle.
  - *« Mes devs s'y sont déjà mis seuls. »* → Sans méthode ni garde-fous, c'est là que
    naissent la dette et les failles. On structure l'existant.
  - *« On verra l'AI Act plus tard. »* → Sanctions en août 2026 ; se mettre en conformité
    prend des mois.
  - *« C'est cher. »* → Comparé au coût d'une dette technique IA non maîtrisée ou d'une
    non-conformité, c'est un investissement défensif.

## 5. Formules

| | Diagnostic | Flagship | Pack complet |
|---|---|---|---|
| Format | 1 jour | 2 jours | 2 j + ½ j direction |
| Pour qui | équipe dev | équipe dev | dev + direction |
| Objectif | démarrer, révéler les écarts | maîtrise complète | maîtrise + gouvernance AI Act |
| Rôle commercial | pied dans la porte | cœur de l'offre / marge | montée en gamme |

Logique : entrer par l'urgence AI Act (direction), puis délivrer la valeur technique aux équipes.

## 6. Programmes

**Objectifs (« capable de… ») :** 1) cadrer une tâche pour un agent (contexte, specs,
contraintes) et obtenir un résultat exploitable du premier coup ; 2) livrer une feature de
bout en bout sur une vraie codebase en AI-first ; 3) appliquer les garde-fous (revue de
code IA, tests, sécurité — et ce qu'on ne délègue jamais) ; 4) intégrer le workflow IA dans
un pipeline réel (Git, CI, QA) ; 5) mesurer le gain de productivité et arbitrer (où l'IA
aide vs dégrade).

**Flagship Jour 1 — Fondations & premier workflow réel :** Matin — orchestrer ≠ coder ;
choisir/configurer les outils (Claude Code, Cursor) ; context engineering (cadrer un agent
pour qu'il livre juste : fichiers `CLAUDE.md`, specs, conventions). Après-midi — atelier :
chacun livre une première fonctionnalité sur sa propre codebase, de la spec au commit.

**Flagship Jour 2 — Passage à l'échelle & qualité :** Matin — dev piloté par les specs ;
découpage des tâches ; revue de code assistée par IA ; tests & QA automatisée. Après-midi —
garde-fous (sécurité, dette, ce qu'on ne délègue jamais) ; intégration pipeline Git/CI ;
survol des patterns avancés (multi-agents = *pattern*) ; mesurer et arbitrer le ROI.

**Diagnostic 1 j (condensé) :** Matin posture AI-first + config outils + context engineering ;
après-midi atelier « première fonctionnalité » + identification des écarts (livrable :
mini-rapport d'écarts + recommandations).

**Module Direction ½ j (option) :** essentiel de l'AI Act + échéance août 2026 ; construire
une politique d'usage IA ; sortir du Shadow AI ; cadrer la gouvernance et mesurer le ROI business.

## 7. Technologies & outils

- **Agents de code :** Claude Code (orchestration CLI/IDE, cœur de la pratique), Cursor
  (éditeur AI-first). Comparaison complétion vs agent autonome supervisé vs orchestration.
- **Context engineering (compétence centrale) :** fichiers de contexte projet (`CLAUDE.md`) ;
  specs exploitables par un agent ; découpage de tâches + boucles de feedback.
- **Intégration & extension :** MCP (Model Context Protocol) pour connecter les agents aux
  outils (ex. QA navigateur via serveur MCP type Playwright) ; branchement Git, revue de PR
  assistée, CI.
- **Qualité & garde-fous :** tests automatisés générés/assistés ; QA visuelle (Playwright) ;
  revue de code (sécurité, secrets, logique métier critique — ce qu'on ne délègue jamais).
- **Automatisation des process (cas d'usage) :** n8n (workflows métier) ; OCR/vision pour la
  dématérialisation ; remplacer un workflow manuel par une chaîne automatisée.
- **Socle infra (perspective, pas vendu à ce stade) :** auto-hébergement (VPS), modèles
  locaux (Ollama), base vectorielle (Qdrant) — rattachés au chantier RAG souverain.
- **Posture :** l'outillage change vite — on enseigne des **principes** (cadrage, garde-fous,
  mesure) transposables, pas un outil figé.

## 8. Livrables

- Un **playbook AI-first** personnalisé à leur stack.
- Des **templates de configuration** (fichiers de contexte, conventions agent) prêts à l'emploi.
- Une **checklist de garde-fous** (revue, sécurité, dette).
- Une **politique d'usage IA** + cadrage AI Act (module direction).
- Argument : le client repart avec des **outils opérationnels**, pas des slides.

## 9. Évaluation

- En continu : ateliers (une fonctionnalité réellement livrée fait foi).
- Fin de parcours : mise en situation + QCM → **attestation de fin de formation**.

## 10. Cadre réglementaire & financement (garde-fous honnêteté)

- **NDA (déclaration d'activité)** à la DREETS dans les 3 mois suivant la 1re convention ;
  autorise à facturer (exonération TVA), aucun diplôme requis.
- **Qualiopi** : label qualité obligatoire pour mobiliser des fonds publics/mutualisés
  (OPCO, CPF, France Travail). En cours d'obtention.
- **Certification RS/RNCP** : nécessaire seulement pour le CPF (B2C). Hors scope.
- ⚠️ **Honnêteté commerciale :** ne mentionner le **financement OPCO** qu'**une fois
  Qualiopi obtenu** ; avant, écrire « prochainement éligible OPCO » ou retirer. Les 2-3
  premières sessions se vendent sur **fonds propres client**.
- **Prix :** grille tarifaire à décider → afficher « sur devis / nous consulter », jamais
  de prix inventé.

## Chantiers parkés (hors catalogue)
- RAG souverain / IA souveraine (perspective).
- Offre B2C / CPF (après standardisation B2B + Qualiopi).
