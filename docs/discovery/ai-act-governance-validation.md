# Validation désirabilité — Outil de gouvernance IA / preuve AI Act (produit #1)

> But : prouver (ou tuer) l'hypothèse produit #1 avant d'écrire une ligne de code, via
> 5 entretiens CTO/Lead dev de PME. Méthode Mom Test : on parle du **passé et du présent**,
> jamais du futur hypothétique ; on ne pitche pas ; on cherche des faits, pas des compliments.
> Cible interviewé : CTO / Lead dev / DSI de PME-scale-up FR (10–150 devs) où l'IA de code
> est déjà utilisée.

---

## 1. L'hypothèse à tester (une phrase)

> Les équipes dev de PME françaises **subissent une douleur réelle et actuelle** autour de
> l'usage non maîtrisé de l'IA de code (Shadow AI, pas de traçabilité, échéance AI Act août 2026),
> **assez forte pour qu'elles paient** un outil qui inventorie + trace + fait la preuve de conformité.

## 2. Les 3 hypothèses risquées (Riskiest Assumptions)

À classer : laquelle, si fausse, tue le produit ? Teste la plus risquée d'abord.

| # | Assumption | Faux = ? | Signal de validation cherché |
|---|---|---|---|
| RA1 — **Douleur** | La perte de contrôle sur l'usage IA est un vrai problème vécu, pas théorique | Produit inutile | Ils décrivent un incident réel passé, sans qu'on souffle |
| RA2 — **Priorité** | C'est assez prioritaire pour y consacrer budget/temps cette année | « Intéressant mais pas maintenant » = mort lente | Ils ont déjà agi (cherché un outil, écrit une politique, missionné qqn) |
| RA3 — **Volonté de payer** | Ils paieraient un SaaS pour ça vs le faire à la main / ignorer | Pas de business | Budget existant sur un poste voisin (conformité, sécu, outillage) |

**Hypothèse la plus risquée = RA2 (priorité).** La douleur AI Act est facile à admettre en
théorie ; la vraie question = passe-t-elle avant leurs 30 autres priorités. Creuse ça le plus.

## 3. Guide d'entretien (20–25 min, ne PAS lire mot à mot)

**Cadre (30s)** : « Je fais de la formation AI-first pour équipes dev. J'enquête sur comment
les équipes gèrent l'usage de l'IA au quotidien. Pas de vente aujourd'hui — je veux juste
comprendre votre réalité. 20 min ? »

**Contexte (chauffe)**
1. Vos devs utilisent quoi comme outils IA aujourd'hui ? (Copilot, Cursor, Claude Code, ChatGPT perso…)
2. Qui a décidé ça — vous, eux, personne ? Comment c'est arrivé ?

**RA1 — douleur (le cœur, creuse le passé réel)**
3. Racontez-moi la dernière fois où l'usage de l'IA par un dev vous a posé problème ou inquiété.
   *(Silence. Laisse-le raconter. Note l'émotion.)*
4. Qu'est-ce qui s'est passé ? Qu'avez-vous fait ?
5. Savez-vous, là maintenant, quels outils IA vos devs utilisent et sur quel code ? Comment vous le sauriez ?
   *(Teste le Shadow AI / inventaire à l'aveugle.)*
6. Du code source ou des données client sont-ils déjà passés dans un outil IA externe ? Ça vous a coûté quoi d'y penser ?

**RA2 — priorité (la plus risquée)**
7. L'AI Act et l'échéance d'août 2026, c'est sur votre radar ? Qui vous en a parlé ?
8. Avez-vous **déjà fait quelque chose** à ce sujet ? (politique d'usage, réunion, recherche d'outil, budget) → *le plus important : action passée = priorité réelle. Rien = tiède.*
9. Sur votre liste de priorités du semestre, ça se situe où ? Devant ou derrière quoi ?

**RA3 — volonté de payer (indirect, pas « paieriez-vous ? »)**
10. Aujourd'hui, si vous deviez prouver à un client/auditeur quels outils IA touchent son code, vous feriez comment ? Combien de temps ça prend ?
11. Si vous deviez régler ça, qui aurait signé la dépense, et à partir de quel montant ça devient une vraie décision (pas un achat réflexe) ? *(indirect — jamais « paieriez-vous ? »)*
12. Vos devs le feraient-ils pas eux-mêmes en interne (script maison, self-host) plutôt qu'acheter ? *(test buy-vs-build — le vrai concurrent, c'est souvent « on bricole nous-mêmes »)*
13. Vous avez regardé des solutions existantes ? Lesquelles, pourquoi écartées ?

**Sortie**
14. Qui d'autre je devrais absolument interroger là-dessus ? (referral = chaîne)
15. Ça vous dérange si je reviens vers vous quand j'ai avancé ?

## 4. Ce qu'on écoute (signaux vs bruit)

| ✅ Signal fort (désirabilité) | ❌ Bruit (politesse) |
|---|---|
| Raconte un incident précis, daté, émotionnel | « Oui c'est un vrai sujet » (générique) |
| A **déjà dépensé du temps/argent** dessus | « On y pensera » / « ce serait bien » |
| Cite un budget et qui signe | « Envoie-moi de la doc » sans engagement |
| Donne des referrals spontanés | Compliments sur l'idée |
| Demande quand ça sort / veut tester | « Tiens-moi au courant » mou |

**Règle Mom Test** : un compliment n'est pas une donnée. Une action passée est une donnée.

## 5. Seuils de décision (kill / continue) — décide AVANT les calls

Sur 5 entretiens :
- **GO produit #1** : ≥ 3/5 décrivent une douleur concrète passée **ET** ≥ 2/5 ont déjà agi (RA2) **ET** ≥ 1 budget/signataire identifié.
- **PIVOT** : douleur confirmée (RA1 ok) mais priorité faible (RA2 échoue) → l'AI Act n'est pas encore le déclencheur d'achat 2026 → repli sur wedge #2 (playbook/templates) et re-test #1 dans 6 mois.
- **KILL #1** : < 2/5 douleur réelle → l'inventaire/traçabilité IA n'est pas un pain payant → abandonne, garde formation seule.

## 6. Ciblage — trouver les 5 CTO (canaux)

> **Beachhead (issu du dry-run) = PME non-régulée + ESN/studios.** Les régulés (fintech/santé)
> ont déjà DPO + budget mais visent l'enterprise (Credo AI) → pas ton entrée. Les ESN portent le
> risque IA de **leurs clients** → douleur AI Act la plus aiguë. **Sur-pondère les ESN/agences
> dans tes 5** (vise ~2 ESN sur 5).

- **ESN / studios / agences dev** (priorité — client-facing AI risk).
- Ton réseau formation Largo IA (prospects/clients déjà en contact = warm).
- LinkedIn : CTO/Lead dev/DSI PME FR ayant posté sur Cursor/Copilot/Claude Code ou AI Act.
- Communautés : Slack/Discord CTO FR, La Product Conf, Human Coders, meetups dev locaux.
- Angle d'accroche (pas de pitch) : « J'enquête sur la gestion de l'usage IA dans les équipes dev avant l'AI Act — 20 min pour comprendre votre réalité ? Zéro vente. » → voir templates §7.

## 7. Outreach — 5 cibles (à personnaliser puis envoyer toi-même)

> ⚠️ Envoi = **action externe**. Je rédige, **tu remplis les `[crochets]` et tu envoies**
> (ou valides chaque envoi). Ne jamais pitcher : on demande 20 min pour *comprendre*, pas vendre.
> Cible visée : **2 ESN/agences + 1 scale-up + 1 régulé + 1 warm réseau** (mix du beachhead §6).

**Règles communes** : court (< 90 mots), 1 seul CTA (20 min), zéro lien, zéro doc jointe,
angle « enquête » pas « offre », signature praticien (« je dirige un SaaS en prod AI-first »).

---

### Cible 1 — ESN / studio dev (chaud prioritaire)

> Bonjour [Prénom], je dirige un SaaS en prod 100 % AI-first et je forme des équipes dev au
> sujet. J'enquête sur un angle précis avant l'AI Act : **quand du code client passe par des
> outils IA (Cursor, Copilot, ChatGPT…), comment une ESN garde la trace de ce qui a touché quoi ?**
> Pas de vente — je cherche à comprendre le réel de gens comme vous. 20 min cette semaine ?
> Vos retours valent de l'or. Merci [Prénom] !

*Pourquoi ça marche : parle de LEUR risque n°1 (code client), pas d'un concept abstrait.*

### Cible 2 — ESN / agence (variante par referral)

> Bonjour [Prénom], [contact commun] m'a suggéré de vous solliciter. Je forme des équipes dev
> au passage AI-first et j'enquête sur la gestion de l'usage IA côté équipe à l'approche de
> l'AI Act — surtout en contexte prestation. 20 min pour entendre comment ça se passe chez vous ?
> Zéro vente, juste comprendre. Merci !

*Le referral (« [contact commun] ») double le taux de réponse — vise ceux que tu peux nommer.*

### Cible 3 — Scale-up produit (Cursor/Claude Code déjà déployé)

> Bonjour [Prénom], vu que votre équipe [a posté sur / utilise ouvertement] les agents de code,
> je me permets : je dirige un SaaS AI-first et j'enquête sur comment les équipes qui ont
> vraiment adopté ces outils gèrent l'usage au quotidien (qui utilise quoi, sur quel code,
> avec quels garde-fous). 20 min pour comparer nos réalités ? Pas de vente. Merci [Prénom] !

*Accroche sur un signal public réel (post/repo) → montre que c'est ciblé, pas du mass-mailing.*

### Cible 4 — PME régulée (fintech / santé / DSI)

> Bonjour [Prénom], j'enquête auprès de responsables tech sur un sujet qui monte : la
> **traçabilité de l'usage de l'IA de code** face à l'AI Act (sanctions dès août 2026). Vous
> êtes en secteur exigeant côté conformité — j'aimerais comprendre comment vous l'anticipez,
> ce qui existe déjà chez vous, ce qui manque. 20 min ? J'apprends plus que je ne raconte. Merci !

*Segment à écouter surtout pour le « déjà agi » (RA2) et le buy-vs-enterprise (Q13).*

### Cible 5 — Réseau formation Largo IA (warm)

> Bonjour [Prénom], suite à [notre échange / la session], je creuse un sujet connexe et votre
> avis m'aiderait vraiment : comment votre équipe garde (ou pas) la maîtrise de qui utilise
> quels outils IA sur quel code. J'explore s'il y a un vrai besoin d'outil là-dessus avant de
> construire quoi que ce soit. 20 min, format discussion ? Merci beaucoup [Prénom] !

*Le plus chaud → commence par lui pour roder le guide avant les cibles froides.*

---

**Relance unique (J+4, toute cible)**
> Bonjour [Prénom], je relance au cas où — 20 min pour parler gestion de l'IA côté équipe dev.
> Même un « pas le temps maintenant » m'aide à cadrer. Bonne journée !

**Ordre d'attaque** : Cible 5 (warm, rodage) → 1 & 2 (ESN, cœur de cible) → 3 → 4.
Espacer, noter chaque réponse dans le log §8.

## 8. Log des résultats (remplir après chaque call)

| CTO | Boîte / taille | RA1 douleur (incident réel ?) | RA2 priorité (déjà agi ?) | RA3 payer (budget/signataire ?) | Referral | Verdict |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

**Synthèse (après 5)** : score vs seuils §5 → GO / PIVOT / KILL. Reporter la décision dans
`~/Vault/04-Business/Largo-IA-strategy.md` (section Open questions).
