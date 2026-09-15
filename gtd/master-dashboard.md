# 🧠 Master Dashboard

> Tento soubor je jen pro čtení. Tasky sem nepište — editujte je přímo v souborech projektů.

---

## 🔴 Next Actions


```dataview
TASK
FROM "projects" OR "GrowOS"
WHERE !completed AND contains(tags, "#next-action")
GROUP BY file.link
SORT file.mtime DESC
```



---

## 📥 Inbox — ke zpracování


```dataview
TASK
FROM "inbox"
WHERE !completed
SORT file.mtime ASC
```



---

## ⏳ Waiting For


```dataview
TASK
FROM "gtd"
WHERE !completed AND contains(tags, "#waiting")
SORT file.mtime ASC
```



---

## ⚠️ Projekty bez next action


```dataview
TABLE file.mtime AS "Naposledy upraveno"
FROM "projects" OR "GrowOS"
WHERE !contains(file.tags, "#completed")
WHERE length(filter(file.tasks, (t) => !t.completed AND contains(t.tags, "#next-action"))) = 0
SORT file.mtime ASC
```
