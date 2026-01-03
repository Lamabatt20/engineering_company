import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// ================= COMPANY =================
export const getCompanyInfo = async () => {
  try {
    const res = await API.get("/company");
    return res.data;
  } catch (error) {
    return { error: error.message };
  }
};

// ================= SERVICES =================
export const getServices = async () => {
  try {
    const res = await API.get("/services");
    return res.data;
  } catch (error) {
    return { error: error.message };
  }
};

// ================= PROJECTS =================

// كل المشاريع (لو احتجتيهم)
export const getProjects = async () => {
  try {
    const res = await API.get("/projects");
    return res.data;
  } catch (error) {
    return { error: error.message };
  }
};

// Main page projects (embedded=false & mechanical=false)
export const getGeneralProjects = async () => {
  try {
    const res = await API.get("/projects/general");
    return res.data;
  } catch (error) {
    return { error: error.message };
  }
};

// Embedded projects
export const getEmbeddedProjects = async () => {
  try {
    const res = await API.get("/projects/embedded");
    return res.data;
  } catch (error) {
    return { error: error.message };
  }
};

// Mechanical projects
export const getMechanicalProjects = async () => {
  try {
    const res = await API.get("/projects/mechanical");
    return res.data;
  } catch (error) {
    return { error: error.message };
  }
};

// ================= PARTNERS =================
export const getPartners = async () => {
  try {
    const res = await API.get("/partners");
    return res.data;
  } catch (error) {
    return { error: error.message };
  }
};

// ================= STATISTICS =================
export const getStatistics = async () => {
  try {
    const res = await API.get("/statistics");
    return res.data;
  } catch (error) {
    return { error: error.message };
  }
};

// ================= WORKFLOW =================
export const getWorkflowSteps = async () => {
  try {
    const res = await API.get("/workflow");
    return res.data;
  } catch (error) {
    return { error: error.message };
  }
};

// ================= CAREERS =================
export const getCareers = async () => {
  try {
    const res = await API.get("/careers");
    return res.data;
  } catch (error) {
    return { error: error.message };
  }
};

export default API;
