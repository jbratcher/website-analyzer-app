# Website Analyzer App

Analyze and produce reports for website using Google Lighthouse automation

[Demo](https://thirsty-lumiere-cb2cbe.netlify.app/)

Repo split into server and client

Stack: Adonis, Nuxt
Hosting: Netlify

Features:

- Node commands to automatically run a lighthouse audit for one website and generate a raw report, an analyzed report, and an 'action-step' list.

  - The raw report is lighthouse report for the URL.
  - The analyzed report has normalized data from the raw report and includes failing audit and their scores.
  - The action steps list describes the remedies for the failing audits in low tech terms.
    - The action steps are designed for the average computer-literate person to be able to complete.

- Dashboard (WIP)
  - Display navigable data in an analytic way.
  - Users will be able to view:
    - categorical scores
    - failed audit and their details

Road map:

Write 'action steps' for each reported issue from Google Lighthouse reports
Create dashboard to view report data and complete action steps.

Create Dashboard focusing on UI

- model some basic dashboard pages
- add user and auth modules
- learn what data is needed during dashboard development
- later create any additional data calls

Convert document folder storage to DB

- NoSQL like MongoDB is best for document oriented and JSON databases(?)
- Research MongoDB for Adonis or best Nodejs framework otherwise

User stories for dashboard refinement

Add subscription model for users

- Developer (free or \$3/month)
- Solo (\$3/month)
- Business (\$17/month)
- Enterprise (\$47/month)

Should this be developed as a Sass or software package?
