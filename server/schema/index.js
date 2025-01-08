const graphql = require("graphql");
const {
  GraphQLLocalTime,
  GraphQLNonEmptyString,
  GraphQLDate,
} = require("graphql-scalars");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull, // Used for making a field required.
} = graphql;

const {
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
  TaxType,
  GenerateSalarySlipType,
  OvertimeType,
  LoginResponseType,
} = require("../schema-types");

const {
  GetAllShifts,
  GetShiftById,
  AddShift,
  UpdateShift,
  DeleteShift,
} = require("../controllers/Shift");
const {
  GetAllDepartments,
  GetDepartmentById,
  AddDepartment,
  UpdateDepartment,
  DeleteDepartment,
} = require("../controllers/Department");
const {
  GetAllRoles,
  GetRoleById,
  AddRole,
  UpdateRole,
  DeleteRole,
} = require("../controllers/Role");
const {
  GetUserById,
  GetUserByCnic,
  GetAllUsers,
  UpdateUser,
  DeleteUser,
  AddUser,
  loginUser,
} = require("../controllers/User");
const {
  GetAllSalaries,
  GetSalaryById,
  CreateSalary,
  UpdateSalary,
  DeleteSalary,
} = require("../controllers/Salary");
const {
  GetAllAttendances,
  GetAttendanceById,
  UpdateAttendance,
  DeleteAttendance,
  CreateAttendance,
} = require("../controllers/Attendance");
const {
  GetAllProjects,
  GetProjectById,
  CreateProject,
  UpdateProject,
  DeleteProject,
} = require("../controllers/Project");
const {
  GetAllProjectProgresses,
  GetProjectProgressById,
  DeleteProjectProgress,
  UpdateProjectProgress,
  CreateProjectProgress,
} = require("../controllers/Project-Progress");
const {
  GetAllInvoices,
  GetInvoiceById,
  DeleteInvoice,
  UpdateInvoice,
  CreateInvoice,
} = require("../controllers/Invoice");
const {
  GetAllRolePrivileges,
  GetRolePrivilegeById,
  DeleteRolePrivilege,
  UpdateRolePrivilege,
  CreateRolePrivilege,
} = require("../controllers/Role-Privileges");
const {
  GetAllSalarySlips,
  GetSalarySlipById,
  DeleteSalarySlip,
  UpdateSalarySlip,
  CreateSalarySlip,
  GenerateSalarySlip,
} = require("../controllers/Salary-Slip");
const {
  GetAllTaxes,
  GetTaxById,
  CreateTax,
  UpdateTax,
  DeleteTax,
} = require("../controllers/Tax");
const {
  AddOvertime,
  UpdateOvertime,
  DeleteOvertime,
  GetAllOvertimes,
  GetOvertimeById,
} = require("../controllers/Overtime");

const authMiddleware = require("../middleware/auth");
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Tax:
    taxes: {
      type: new GraphQLList(TaxType),
      description: "List of all Taxes",
      resolve: authMiddleware(async (parent) => {
        return await GetAllTaxes(parent);
      }),
    },
    tax: {
      type: TaxType,
      description: "A single Tax",
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: authMiddleware(async (parent, args) => {
        return await GetTaxById(parent, args);
      }),
    },

    // Shift:
    shifts: {
      type: new GraphQLList(ShiftType),
      description: "List of all Shifts",
      resolve: authMiddleware(async (parent) => {
        return await GetAllShifts(parent);
      }),
    },
    shift: {
      type: ShiftType,
      description: "A single Shift",
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: authMiddleware(async (parent, args) => {
        return await GetShiftById(parent, args);
      }),
    },

    // Department:
    departments: {
      type: new GraphQLList(DepartmentType),
      description: "List of all Departments",
      resolve: authMiddleware(async (parent) => {
        return await GetAllDepartments(parent);
      }),
    },
    department: {
      type: DepartmentType,
      description: "A single Department",
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: authMiddleware(async (parent, args) => {
        return await GetDepartmentById(parent, args);
      }),
    },

    // Overtime:
    overtimes: {
      type: new GraphQLList(OvertimeType),
      description: "List of all Overtimes",
      resolve: authMiddleware(async (parent) => {
        return await GetAllOvertimes(parent);
      }),
    },
    overtime: {
      type: OvertimeType,
      description: "A single Overtime",
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: authMiddleware(async (parent, args) => {
        return await GetOvertimeById(parent, args);
      }),
    },

    // Role:
    roles: {
      type: new GraphQLList(RoleType),
      description: "List of all Roles",
      resolve: authMiddleware(async (parent) => {
        return await GetAllRoles(parent);
      }),
    },
    role: {
      type: RoleType,
      description: "A single Role",
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: authMiddleware(async (parent, args) => {
        return await GetRoleById(parent, args);
      }),
    },

    // User:
    users: {
      type: new GraphQLList(UserType),
      description: "List of all Users",
      resolve: authMiddleware(async (parent) => {
        return await GetAllUsers(parent);
      }),
    },
    user: {
      type: UserType,
      description: "A single User",
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: authMiddleware(async (parent, args) => {
        return await GetUserById(parent, args);
      }),
    },
    userByCnic: {
      type: UserType,
      description: "A single User by CNIC",
      args: { cnic: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: authMiddleware(async (parent, args) => {
        return await GetUserByCnic(parent, args);
      }),
    },

    // Salary:
    salaries: {
      type: new GraphQLList(SalaryType),
      description: "List of all Salaries",
      resolve: authMiddleware(async (parent) => {
        return await GetAllSalaries(parent);
      }),
    },
    salary: {
      type: SalaryType,
      description: "Salary of given id",
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: authMiddleware(async (parent, args) => {
        return await GetSalaryById(parent, args);
      }),
    },

    // Attendance:
    attendances: {
      type: new GraphQLList(AttendanceType),
      description: "List of all Attendances",
      resolve: authMiddleware(async (parent) => {
        return await GetAllAttendances(parent);
      }),
    },
    attendance: {
      type: AttendanceType,
      description: "Attendance of given id",
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: authMiddleware(async (parent, args) => {
        return await GetAttendanceById(parent, args);
      }),
    },

    // Project:
    projects: {
      type: new GraphQLList(ProjectType),
      description: "List of all Projects",
      resolve: authMiddleware(async (parent) => {
        return await GetAllProjects(parent);
      }),
    },
    project: {
      type: ProjectType,
      description: "Project of given id",
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: authMiddleware(async (parent, args) => {
        return await GetProjectById(parent, args);
      }),
    },

    // ProjectProgress:
    projectProgresses: {
      type: new GraphQLList(ProjectProgressType),
      description: "List of all Project Progresses",
      resolve: authMiddleware(async (parent) => {
        return await GetAllProjectProgresses(parent);
      }),
    },
    projectProgress: {
      type: ProjectProgressType,
      description: "Project Progress of given id",
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: authMiddleware(async (parent, args) => {
        return await GetProjectProgressById(parent, args);
      }),
    },

    // Invoice:
    invoices: {
      type: new GraphQLList(InvoiceType),
      description: "List of all Invoices",
      resolve: authMiddleware(async (parent) => {
        return await GetAllInvoices(parent);
      }),
    },
    invoice: {
      type: InvoiceType,
      description: "Invoice of given id",
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: authMiddleware(async (parent, args) => {
        return await GetInvoiceById(parent, args);
      }),
    },

    // Role Privileges:
    rolePrivileges: {
      type: new GraphQLList(RolePrivilegesType),
      description: "List of all  Role Privileges",
      resolve: authMiddleware(async (parent) => {
        return await GetAllRolePrivileges(parent);
      }),
    },
    rolePrivilege: {
      type: RolePrivilegesType,
      description: "Role Privileges of given id",
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: authMiddleware(async (parent, args) => {
        return await GetRolePrivilegeById(parent, args);
      }),
    },

    // Salary Slip:
    salarySlips: {
      type: new GraphQLList(SalarySlipType),
      description: "List of all Salary Slips",
      resolve: authMiddleware(async (parent) => {
        return await GetAllSalarySlips(parent);
      }),
    },
    salarySlip: {
      type: SalarySlipType,
      description: "Salary Slip of given id",
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: authMiddleware(async (parent, args) => {
        return await GetSalarySlipById(parent, args);
      }),
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Tax:
    addTax: {
      type: TaxType,
      description: "Add a new Tax",
      args: {
        minIncome: { type: new GraphQLNonNull(GraphQLInt) },
        maxIncome: { type: new GraphQLNonNull(GraphQLInt) },
        taxRate: { type: new GraphQLNonNull(GraphQLFloat) },
        taxAmount: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await CreateTax(parent, args);
      }),
    },
    updateTax: {
      type: GraphQLString,
      description: "Update a Tax",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        minIncome: { type: GraphQLInt },
        maxIncome: { type: GraphQLInt },
        taxRate: { type: GraphQLFloat },
        taxAmount: { type: GraphQLInt },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await UpdateTax(parent, args);
      }),
    },
    deleteTax: {
      type: GraphQLString,
      description: "Delete a Tax",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await DeleteTax(parent, args);
      }),
    },

    // Shift:
    addShift: {
      type: ShiftType,
      description: "Add a new Shift",
      args: {
        shift: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        startTime: { type: new GraphQLNonNull(GraphQLLocalTime) },
        endTime: { type: new GraphQLNonNull(GraphQLLocalTime) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await AddShift(parent, args);
      }),
    },
    updateShift: {
      type: GraphQLString,
      description: "Update a Shift",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        shift: { type: GraphQLNonEmptyString },
        startTime: { type: GraphQLLocalTime },
        endTime: { type: GraphQLLocalTime },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await UpdateShift(parent, args);
      }),
    },
    deleteShift: {
      type: GraphQLString,
      description: "Delete a Shift",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await DeleteShift(parent, args);
      }),
    },

    // Department:
    addDepartment: {
      type: DepartmentType,
      description: "Add a new Department",
      args: {
        departmentHead: { type: GraphQLID },
        departmentName: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        employeeCount: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await AddDepartment(parent, args);
      }),
    },
    updateDepartment: {
      type: GraphQLString,
      description: "Update a Department",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        departmentHead: { type: GraphQLID },
        departmentName: { type: GraphQLNonEmptyString },
        employeeCount: { type: GraphQLInt },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await UpdateDepartment(parent, args);
      }),
    },
    deleteDepartment: {
      type: GraphQLString,
      description: "Delete a Department",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await DeleteDepartment(parent, args);
      }),
    },

    // Role:
    addRole: {
      type: RoleType,
      description: "Add a new Role",
      args: {
        roleName: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        designation: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        description: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await AddRole(parent, args);
      }),
    },
    updateRole: {
      type: GraphQLString,
      description: "Update a Role",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        roleName: { type: GraphQLNonEmptyString },
        designation: { type: GraphQLNonEmptyString },
        description: { type: GraphQLNonEmptyString },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await UpdateRole(parent, args);
      }),
    },
    deleteRole: {
      type: GraphQLString,
      description: "Delete a Role",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await DeleteRole(parent, args);
      }),
    },

    // Overtime:
    addOvertime: {
      type: OvertimeType,
      description: "Add a new Overtime",
      args: {
        roleId: { type: new GraphQLNonNull(GraphQLID) },
        gender: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        rate: { type: new GraphQLNonNull(GraphQLFloat) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await AddOvertime(parent, args);
      }),
    },
    updateOvertime: {
      type: GraphQLString,
      description: "Update a Overtime",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        roleId: { type: GraphQLID },
        gender: { type: GraphQLNonEmptyString },
        rate: { type: GraphQLFloat },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await UpdateOvertime(parent, args);
      }),
    },
    deleteOvertime: {
      type: GraphQLString,
      description: "Delete a Overtime",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await DeleteOvertime(parent, args);
      }),
    },

    // User:
    addUser: {
      type: UserType,
      description: "Add a new User",
      args: {
        shiftId: { type: new GraphQLNonNull(GraphQLID) },
        roleId: { type: new GraphQLNonNull(GraphQLID) },
        departmentId: { type: new GraphQLNonNull(GraphQLID) },
        employeeId: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        name: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        mobileNo: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        gender: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        cnic: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        email: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        password: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        address: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        jobTitle: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        hireDate: { type: new GraphQLNonNull(GraphQLDate) },
        dob: { type: new GraphQLNonNull(GraphQLDate) },
        status: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        leaves: { type: new GraphQLNonNull(GraphQLInt) },
        availableLeaves: { type: new GraphQLNonNull(GraphQLFloat) },
        commissionFlag: { type: new GraphQLNonNull(GraphQLBoolean) },
        commissionPercentage: {
          type: new GraphQLNonNull(GraphQLFloat),
        },
        providentFund: {
          type: new GraphQLNonNull(GraphQLFloat),
        },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await AddUser(parent, args);
      }),
    },
    updateUser: {
      type: GraphQLString,
      description: "Update a User",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        shiftId: { type: GraphQLID },
        roleId: { type: GraphQLID },
        departmentId: { type: GraphQLID },
        employeeId: { type: GraphQLNonEmptyString },
        name: { type: GraphQLNonEmptyString },
        mobileNo: { type: GraphQLNonEmptyString },
        gender: { type: GraphQLNonEmptyString },
        cnic: { type: GraphQLNonEmptyString },
        email: { type: GraphQLNonEmptyString },
        password: { type: GraphQLNonEmptyString },
        address: { type: GraphQLNonEmptyString },
        jobTitle: { type: GraphQLNonEmptyString },
        hireDate: { type: GraphQLDate },
        dob: { type: GraphQLDate },
        status: { type: GraphQLNonEmptyString },
        leaves: { type: GraphQLInt },
        availableLeaves: { type: GraphQLFloat },
        commissionFlag: { type: GraphQLBoolean },
        commissionPercentage: {
          type: GraphQLFloat,
        },
        providentFund: {
          type: GraphQLFloat,
        },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await UpdateUser(parent, args);
      }),
    },
    deleteUser: {
      type: GraphQLString,
      description: "Delete a User",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await DeleteUser(parent, args);
      }),
    },
    loginUser: {
      type: LoginResponseType,
      description: "Login User",
      args: {
        email: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        password: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
      },
      resolve: (parent, args, context) => loginUser(parent, args, context),
    },

    // Salary:
    createSalary: {
      type: SalaryType,
      description: "Create new Salary",
      args: {
        employeeId: { type: new GraphQLNonNull(GraphQLID) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
        effectiveDate: { type: new GraphQLNonNull(GraphQLDate) },
        incrementDate: { type: new GraphQLNonNull(GraphQLDate) },
        incrementPercentage: {
          type: new GraphQLNonNull(GraphQLFloat),
        },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await CreateSalary(parent, args);
      }),
    },
    updateSalary: {
      type: GraphQLString,
      description: "Update User's Salary",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        employeeId: { type: GraphQLID },
        amount: { type: GraphQLInt },
        effectiveDate: { type: GraphQLDate },
        incrementDate: { type: GraphQLDate },
        incrementPercentage: {
          type: GraphQLFloat,
        },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await UpdateSalary(parent, args);
      }),
    },
    deleteSalary: {
      type: GraphQLString,
      description: "Delete User's Salary",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await DeleteSalary(parent, args);
      }),
    },

    // Attendance:
    createAttendance: {
      type: AttendanceType,
      description: "Create new Attendance",
      args: {
        employeeId: { type: new GraphQLNonNull(GraphQLID) },
        date: { type: new GraphQLNonNull(GraphQLDate) },
        inTime: { type: new GraphQLNonNull(GraphQLLocalTime) },
        outTime: { type: new GraphQLNonNull(GraphQLLocalTime) },
        publicHoliday: {
          type: new GraphQLNonNull(GraphQLBoolean),
        },
        tourHoliday: {
          type: new GraphQLNonNull(GraphQLBoolean),
        },
        weekend: {
          type: new GraphQLNonNull(GraphQLBoolean),
        },
        leave: {
          type: new GraphQLNonNull(GraphQLFloat),
        },
        overtime: {
          type: GraphQLFloat,
        },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await CreateAttendance(parent, args);
      }),
    },
    updateAttendance: {
      type: GraphQLString,
      description: "Update User's Attendance",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        employeeId: { type: GraphQLID },
        date: { type: GraphQLDate },
        inTime: { type: GraphQLLocalTime },
        outTime: { type: GraphQLLocalTime },
        publicHoliday: {
          type: GraphQLBoolean,
        },
        tourHoliday: {
          type: GraphQLBoolean,
        },
        weekend: {
          type: GraphQLBoolean,
        },
        leave: {
          type: GraphQLFloat,
        },
        overtime: {
          type: GraphQLFloat,
        },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await UpdateAttendance(parent, args);
      }),
    },
    deleteAttendance: {
      type: GraphQLString,
      description: "Delete User's Attendance",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await DeleteAttendance(parent, args);
      }),
    },

    // Project:
    createProject: {
      type: ProjectType,
      description: "Create new Project",
      args: {
        resourcesAllocated: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLID)),
        },
        bdId: { type: new GraphQLNonNull(GraphQLID) },
        teamLeadId: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        startDate: { type: new GraphQLNonNull(GraphQLDate) },
        endDate: { type: new GraphQLNonNull(GraphQLDate) },
        status: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        clientName: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        platform: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        clientRegion: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        hourlyFlag: { type: new GraphQLNonNull(GraphQLBoolean) },
        fixedFlag: { type: new GraphQLNonNull(GraphQLBoolean) },
        fixedAmount: { type: new GraphQLNonNull(GraphQLInt) },
        hourlyRate: { type: new GraphQLNonNull(GraphQLFloat) },
        b2bFlag: { type: new GraphQLNonNull(GraphQLBoolean) },
        milestones: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await CreateProject(parent, args);
      }),
    },
    updateProject: {
      type: GraphQLString,
      description: "Update User's Project",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        resourcesAllocated: { type: new GraphQLList(GraphQLID) },
        bdId: { type: GraphQLID },
        teamLeadId: { type: GraphQLID },
        name: { type: GraphQLNonEmptyString },
        startDate: { type: GraphQLDate },
        endDate: { type: GraphQLDate },
        status: { type: GraphQLNonEmptyString },
        clientName: { type: GraphQLNonEmptyString },
        platform: { type: GraphQLNonEmptyString },
        clientRegion: { type: GraphQLNonEmptyString },
        hourlyFlag: { type: GraphQLBoolean },
        fixedFlag: { type: GraphQLBoolean },
        fixedAmount: { type: GraphQLInt },
        hourlyRate: { type: GraphQLFloat },
        b2bFlag: { type: GraphQLBoolean },
        milestones: { type: GraphQLInt },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await UpdateProject(parent, args);
      }),
    },
    deleteProject: {
      type: GraphQLString,
      description: "Delete User's Project",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await DeleteProject(parent, args);
      }),
    },

    // ProjectProgress:
    createProjectProgress: {
      type: ProjectProgressType,
      description: "Create a new Project Progress",
      args: {
        employeeId: { type: new GraphQLNonNull(GraphQLID) },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
        startDate: { type: new GraphQLNonNull(GraphQLDate) },
        endDate: { type: new GraphQLNonNull(GraphQLDate) },
        hoursWorked: { type: new GraphQLNonNull(GraphQLInt) },
        totalAmount: { type: new GraphQLNonNull(GraphQLFloat) },
        startTime: { type: new GraphQLNonNull(GraphQLLocalTime) },
        endTime: { type: new GraphQLNonNull(GraphQLLocalTime) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await CreateProjectProgress(parent, args);
      }),
    },
    updateProjectProgress: {
      type: GraphQLString,
      description: "Update User's Project",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        employeeId: { type: GraphQLID },
        projectId: { type: GraphQLID },
        startDate: { type: GraphQLDate },
        endDate: { type: GraphQLDate },
        hoursWorked: { type: GraphQLInt },
        totalAmount: { type: GraphQLFloat },
        startTime: { type: GraphQLLocalTime },
        endTime: { type: GraphQLLocalTime },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await UpdateProjectProgress(parent, args);
      }),
    },
    deleteProjectProgress: {
      type: GraphQLString,
      description: "Delete Project Progress",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await DeleteProjectProgress(parent, args);
      }),
    },

    // Invoice:
    createInvoice: {
      type: InvoiceType,
      description: "Create a new Invoice",
      args: {
        projectId: { type: new GraphQLNonNull(GraphQLID) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) },
        dueDate: { type: new GraphQLNonNull(GraphQLDate) },
        description: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        status: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        taxAmount: { type: new GraphQLNonNull(GraphQLFloat) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await CreateInvoice(parent, args);
      }),
    },
    updateInvoice: {
      type: GraphQLString,
      description: "Update an Invoice",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        projectId: { type: GraphQLID },
        amount: { type: GraphQLFloat },
        dueDate: { type: GraphQLDate },
        description: { type: GraphQLNonEmptyString },
        status: { type: GraphQLNonEmptyString },
        taxAmount: { type: GraphQLFloat },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await UpdateInvoice(parent, args);
      }),
    },
    deleteInvoice: {
      type: GraphQLString,
      description: "Delete an Invoice",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await DeleteInvoice(parent, args);
      }),
    },

    // Role Privileges:
    createRolePrivilege: {
      type: RolePrivilegesType,
      description: "Create a new Role Privileges",
      args: {
        tableName: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
        canCreate: { type: new GraphQLList(GraphQLID) },
        canRead: { type: new GraphQLList(GraphQLID) },
        canUpdate: { type: new GraphQLList(GraphQLID) },
        canDelete: { type: new GraphQLList(GraphQLID) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await CreateRolePrivilege(parent, args);
      }),
    },
    updateRolePrivilege: {
      type: GraphQLString,
      description: "Update a Role Privilege",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        tableName: { type: GraphQLNonEmptyString },
        canCreate: { type: new GraphQLList(GraphQLID) },
        canRead: { type: new GraphQLList(GraphQLID) },
        canUpdate: { type: new GraphQLList(GraphQLID) },
        canDelete: { type: new GraphQLList(GraphQLID) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await UpdateRolePrivilege(parent, args);
      }),
    },
    deleteRolePrivilege: {
      type: GraphQLString,
      description: "Delete a Role Privilege",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await DeleteRolePrivilege(parent, args);
      }),
    },

    // Salary Slip:
    createSalarySlip: {
      type: SalarySlipType,
      description: "Create a new Salary Slip",
      args: {
        employeeId: { type: new GraphQLNonNull(GraphQLID) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        workingDays: { type: new GraphQLNonNull(GraphQLInt) },
        salary: { type: new GraphQLNonNull(GraphQLFloat) },
        basicSalary: { type: new GraphQLNonNull(GraphQLFloat) },
        overtimePrice: { type: new GraphQLNonNull(GraphQLFloat) },
        overtimeHours: { type: new GraphQLNonNull(GraphQLFloat) },
        commission: { type: new GraphQLNonNull(GraphQLFloat) },
        extendedLeaves: { type: new GraphQLNonNull(GraphQLFloat) },
        fine: { type: new GraphQLNonNull(GraphQLFloat) },
        tax: { type: new GraphQLNonNull(GraphQLFloat) },
        providentFund: { type: new GraphQLNonNull(GraphQLFloat) },
        others: { type: new GraphQLNonNull(GraphQLFloat) },
        totalPay: { type: new GraphQLNonNull(GraphQLFloat) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await CreateSalarySlip(parent, args);
      }),
    },
    updateSalarySlip: {
      type: GraphQLString,
      description: "Update a Salary Slip",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        employeeId: { type: GraphQLID },
        date: { type: GraphQLString },
        workingDays: { type: GraphQLInt },
        salary: { type: GraphQLFloat },
        basicSalary: { type: GraphQLFloat },
        overtimePrice: { type: GraphQLFloat },
        overtimeHours: { type: GraphQLFloat },
        commission: { type: GraphQLFloat },
        extendedLeaves: { type: GraphQLFloat },
        fine: { type: GraphQLFloat },
        tax: { type: GraphQLFloat },
        providentFund: { type: GraphQLFloat },
        others: { type: GraphQLFloat },
        totalPay: { type: GraphQLFloat },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await UpdateSalarySlip(parent, args);
      }),
    },
    deleteSalarySlip: {
      type: GraphQLString,
      description: "Delete a Salary Slip",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await DeleteSalarySlip(parent, args);
      }),
    },

    generateSalarySlip: {
      type: GenerateSalarySlipType,
      description: "Generate a Salary Slip of given employeeId",
      args: {
        employeeId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: authMiddleware(async (parent, args) => {
        return await GenerateSalarySlip(parent, args);
      }),
    },
  },
});
module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
