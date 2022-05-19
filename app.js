const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const { format, isValid } = require("date-fns");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "todoApplication.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(4000, () => {
      console.log("Server started and running at port number: 4000");
    });
  } catch (e) {
    console.log(`DB error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

const statusList = ["TO DO", "IN PROGRESS", "DONE"];
const priorityList = ["HIGH", "LOW", "MEDIUM"];
const categoryList = ["WORK", "HOME", "LEARNING"];

// const validateGivenDate = (req, res, next) => {
//   const { dueDate } = req.body;
//   const isDateValid = isValid(new Date(dueDate));
//   //   console.log("isDateValid: ", isDateValid);
//   if (isDateValid) {
//     next();
//   } else {
//     res.status(400);
//     res.send("Invalid Date");
//   }
// };

const validateGivenDate = (dueDate) => {
  return isValid(new Date(dueDate));
};

const paramVerification = (param, possibilityList) => {
  return possibilityList.includes(param);
};

const verifyBodyStats = (req, res, next) => {
  const {
    status = "",
    priority = "",
    category = "",
    dueDate = "",
    todo = "",
  } = req.body;

  if (
    status !== "" &&
    priority !== "" &&
    category !== "" &&
    dueDate !== "" &&
    todo !== ""
  ) {
    let isStatusVerified = paramVerification(status, statusList);
    let isPriorityVerified = paramVerification(priority, priorityList);
    let isCategoryVerified = paramVerification(category, categoryList);
    let isDateValid = validateGivenDate(dueDate);
    if (
      isStatusVerified &&
      isPriorityVerified &&
      isCategoryVerified &&
      isDateValid
    ) {
      next();
    } else if (!isStatusVerified) {
      res.status(400);
      res.send("Invalid Todo Status");
    } else if (!isPriorityVerified) {
      res.status(400);
      res.send("Invalid Todo Priority");
    } else if (!isCategoryVerified) {
      res.status(400);
      res.send("Invalid Todo Category");
    } else if (!isDateValid) {
      res.status(400);
      res.send("Invalid Due Date");
    }
  } else if (status !== "" && priority !== "") {
    let isStatusVerified = paramVerification(status, statusList);
    let isPriorityVerified = paramVerification(priority, priorityList);

    if (isStatusVerified && isPriorityVerified) {
      next();
    } else if (!isStatusVerified) {
      res.status(400);
      res.send("Invalid Todo Status");
    } else if (!isPriorityVerified) {
      res.status(400);
      res.send("Invalid Todo Priority");
    }
  } else if (category !== "" && priority !== "") {
    let isCategoryVerified = paramVerification(category, categoryList);
    let isPriorityVerified = paramVerification(priority, priorityList);

    if (isCategoryVerified && isPriorityVerified) {
      next();
    } else if (!isCategoryVerified) {
      res.status(400);
      res.send("Invalid Todo Category");
    } else if (!isPriorityVerified) {
      res.status(400);
      res.send("Invalid Todo Priority");
    }
  } else if (status !== "" && category !== "") {
    let isStatusVerified = paramVerification(status, statusList);
    let isCategoryVerified = paramVerification(category, categoryList);

    if (isCategoryVerified && isStatusVerified) {
      next();
    } else if (!isCategoryVerified) {
      res.status(400);
      res.send("Invalid Todo Category");
    } else if (!isStatusVerified) {
      res.status(400);
      res.send("Invalid Todo Status");
    }
  } else if (status !== "") {
    let isStatusVerified = paramVerification(status, statusList);

    if (isStatusVerified) {
      next();
    } else {
      res.status(400);
      res.send("Invalid Todo Status");
    }
  } else if (priority !== "") {
    let isPriorityVerified = paramVerification(priority, priorityList);

    if (isPriorityVerified) {
      next();
    } else {
      res.status(400);
      res.send("Invalid Todo Priority");
    }
  } else if (category !== "") {
    let isCategoryVerified = paramVerification(category, categoryList);
    if (isCategoryVerified) {
      next();
    } else {
      res.status(400);
      res.send("Invalid Todo Category");
    }
  } else if (dueDate !== "") {
    let isDateValid = validateGivenDate(dueDate);
    if (isDateValid) {
      next();
    } else {
      res.status(400);
      res.send("Invalid Due Date");
    }
  } else if (todo !== "") {
    next();
  }
};

const verifyQueryStats = (req, res, next) => {
  const { status = "", priority = "", category = "" } = req.query;
  if (status === "" && priority === "" && category === "") {
    next();
  } else if (status !== "" && priority !== "") {
    let isStatusVerified = paramVerification(status, statusList);
    let isPriorityVerified = paramVerification(priority, priorityList);

    if (isStatusVerified && isPriorityVerified) {
      next();
    } else if (!isStatusVerified) {
      res.status(400);
      res.send("Invalid Todo Status");
    } else if (!isPriorityVerified) {
      res.status(400);
      res.send("Invalid Todo Priority");
    }
  } else if (category !== "" && priority !== "") {
    let isCategoryVerified = paramVerification(category, categoryList);
    let isPriorityVerified = paramVerification(priority, priorityList);

    if (isCategoryVerified && isPriorityVerified) {
      next();
    } else if (!isCategoryVerified) {
      res.status(400);
      res.send("Invalid Todo Category");
    } else if (!isPriorityVerified) {
      res.status(400);
      res.send("Invalid Todo Priority");
    }
  } else if (status !== "" && category !== "") {
    let isStatusVerified = paramVerification(status, statusList);
    let isCategoryVerified = paramVerification(category, categoryList);

    if (isCategoryVerified && isStatusVerified) {
      next();
    } else if (!isCategoryVerified) {
      res.status(400);
      res.send("Invalid Todo Category");
    } else if (!isStatusVerified) {
      res.status(400);
      res.send("Invalid Todo Status");
    }
  } else if (status !== "") {
    let isStatusVerified = paramVerification(status, statusList);

    if (isStatusVerified) {
      next();
    } else {
      res.status(400);
      res.send("Invalid Todo Status");
    }
  } else if (priority !== "") {
    let isPriorityVerified = paramVerification(priority, priorityList);

    if (isPriorityVerified) {
      next();
    } else {
      res.status(400);
      res.send("Invalid Todo Priority");
    }
  } else if (category !== "") {
    let isCategoryVerified = paramVerification(category, categoryList);
    if (isCategoryVerified) {
      next();
    } else {
      res.status(400);
      res.send("Invalid Todo Category");
    }
  }
};

// home
app.get("/", (req, res) => {
  res.send("Welcome");
});

// get todo list API
// app.get("/todos/", async (req, res) => {
app.get("/todos/", verifyQueryStats, async (req, res) => {
  const {
    status = "",
    priority = "",
    search_q = "",
    category = "",
  } = req.query;

  let getTodoListQuery;

  if (status !== "" && priority !== "") {
    getTodoListQuery = `SELECT * FROM todo WHERE status LIKE '${status}' AND priority = '${priority}';`;
  } else if (status !== "" && category !== "") {
    getTodoListQuery = `SELECT * FROM todo WHERE status LIKE '${status}' AND category = '${category}';`;
  } else if (priority !== "" && category !== "") {
    getTodoListQuery = `SELECT * FROM todo WHERE priority LIKE '${priority}' AND category = '${category}';`;
  } else if (status !== "") {
    getTodoListQuery = `SELECT * FROM todo WHERE status LIKE '${status}'`;
  } else if (priority !== "") {
    getTodoListQuery = `SELECT * FROM todo WHERE priority LIKE '${priority}'`;
  } else if (category !== "") {
    getTodoListQuery = `SELECT * FROM todo WHERE category LIKE '${category}'`;
  } else if (search_q !== "") {
    getTodoListQuery = `SELECT * FROM todo WHERE todo LIKE '%${search_q}%';`;
  } else {
    getTodoListQuery = `SELECT * FROM todo;`;
  }

  const todoArray = await db.all(getTodoListQuery);
  res.send(todoArray);
});

// get todo by id
app.get("/todos/:todoId/", async (req, res) => {
  const { todoId } = req.params;
  const getTodoByIdQuery = `SELECT * FROM todo WHERE id = ${todoId};`;
  const todoDetails = await db.get(getTodoByIdQuery);
  res.send(todoDetails);
});

// get todo with due_date query API
app.get("/agenda/", async (req, res) => {
  let { date } = req.query;
  let isDateValid = validateGivenDate(date);
  if (isDateValid) {
    date = format(new Date(date), "yyyy-MM-dd");
    const getTodoWithMatchingDateQuery = `SELECT * FROM todo WHERE due_date = '${date}';`;
    const todoListWithMatchingDate = await db.all(getTodoWithMatchingDateQuery);
    res.send(todoListWithMatchingDate);
  } else {
    res.send("Invalid Due Date");
  }
});

// add new todo API
app.post("/todos/", verifyBodyStats, async (req, res) => {
  const { id, todo, priority, status, category, dueDate } = req.body;
  const newDueDate = format(
    new Date(
      parseInt(dueDate.split("-")[0]),
      parseInt(dueDate.split("-")[1]) - 1,
      parseInt(dueDate.split("-")[2])
    ),
    "yyy-MM-dd"
  );
  //   console.log("newDueDate in post method: ", newDueDate);
  const addTodoQuery = `INSERT INTO todo (id, todo, category, priority, status, due_date) VALUES (${id},'${todo}','${priority}','${status}', '${category}','${newDueDate}')`;
  await db.run(addTodoQuery);
  res.send("Todo Successfully Added");
});

// update todo API
app.put("/todos/:todoId/", verifyBodyStats, async (req, res) => {
  const { todoId } = req.params;
  const {
    status = "",
    priority = "",
    todo = "",
    category = "",
    dueDate = "",
  } = req.body;
  let updateStatusQuery;
  let message = "Something is wrong!";

  if (status !== "") {
    updateStatusQuery = `UPDATE todo SET status = '${status}' WHERE id = ${todoId};`;
    message = "Status Updated";
  } else if (priority !== "") {
    updateStatusQuery = `UPDATE todo SET priority = '${priority}' WHERE id = ${todoId};`;
    message = "Priority Updated";
  } else if (todo !== "") {
    updateStatusQuery = `UPDATE todo SET todo = '${todo}' WHERE id = ${todoId};`;
    message = "Todo Updated";
  } else if (category !== "") {
    updateStatusQuery = `UPDATE todo SET category = '${category}' WHERE id = ${todoId};`;
    message = "Category Updated";
  } else if (dueDate !== "") {
    const newDueDate = format(
      new Date(
        parseInt(dueDate.split("-")[0]),
        parseInt(dueDate.split("-")[1]) - 1,
        parseInt(dueDate.split("-")[2])
      ),
      "yyy-MM-dd"
    );
    updateStatusQuery = `UPDATE todo SET due_date = ${newDueDate} WHERE id = ${todoId};`;
    message = "Due Date Updated";
  }

  await db.run(updateStatusQuery);
  res.send(message);
});

// delete todo API
app.delete("/todos/:todoId/", async (req, res) => {
  const { todoId } = req.params;
  const deleteTodoQuery = `DELETE FROM todo WHERE id = ${todoId};`;
  await db.run(deleteTodoQuery);
  res.send("Todo Deleted");
});

module.exports = app;
