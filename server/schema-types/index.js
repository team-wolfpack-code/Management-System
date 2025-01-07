const ShiftType = require("./Shift");
const DepartmentType = require("./Department");
const RoleType = require("./Role");
const UserType = require("./User");
const SalaryType = require("./Salary");
const AttendanceType = require("./Attendance");
const ProjectType = require("./Project");
const ProjectProgressType = require("./Project-Progress");
const InvoiceType = require("./Invoice");
const RolePrivilegesType = require("./Role-Privileges");
const { SalarySlipType, GenerateSalarySlipType } = require("./Salary-Slip");
const TaxType = require("./Tax");
const OvertimeType = require("./Overtime");
const LoginResponseType = require("./Auth");

module.exports = {
  ShiftType,
  DepartmentType,
  RoleType,
  UserType,
  SalaryType,
  AttendanceType,
  ProjectType,
  ProjectProgressType,
  InvoiceType,
  RolePrivilegesType,
  SalarySlipType,
  GenerateSalarySlipType,
  TaxType,
  OvertimeType,
  LoginResponseType,
};
