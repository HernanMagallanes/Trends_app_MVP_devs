const {
  getUserById,
  getUsers,
  getJobById,
  getJobs,
} = require("../controllers/search.controllers");

const searchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await getUserById(id);

    if (!userById) {
      return res.status(400).json({
        error: "No user with that id found",
      });
    }

    res.status(200).json(userById);
  } catch (error) {
    return res.status(500).json({
      error: "Error searching user",
    });
  }
};

const searchUsers = async (req, res) => {
  const queryParams = { ...req.query };
  const userType = queryParams?.type;
  const page = parseInt(queryParams.page) || 1; // Página actual, por defecto 1
  delete queryParams.page;

  if (!["student", "professional", "company"].includes(userType)) {
    return res.status(400).json({ error: "Invalid user type" });
  }

  try {
    const users = await getUsers(queryParams, userType, page);

    if (!users) {
      return res.status(400).json({ error: "No users found" });
    }
    if (users.error)
      return res.status(500).json({
        error: users.error,
      });

    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const searchJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobById = await getJobById(id);

    if (!jobById) {
      return res.status(400).json({ error: "Job not found" });
    }

    res.status(200).json(jobById);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const searchJobs = async (req, res) => {
  const queryParams = { ...req.query };
  const page = parseInt(queryParams.page) || 1; // Página actual, por defecto 1
  delete queryParams.page;

  try {
    const jobs = await getJobs(queryParams, page);

    if (!jobs) {
      return res.status(500).json({
        error: "No jobs found",
      });
    }

    if (jobs.error)
      return res.status(500).json({
        error: jobs.error,
      });

    res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = { searchUserById, searchUsers, searchJobById, searchJobs };
