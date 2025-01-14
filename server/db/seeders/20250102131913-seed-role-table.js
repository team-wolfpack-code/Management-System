"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Roles", [
      // Technical Roles
      {
        roleName: "Super Admin",
        designation: "System Administrator",
        description:
          "Has full control over all system functionalities, including managing users, roles, and permissions.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   roleName: "Admin",
      //   designation: "Administrator",
      //   description:
      //     "Manages system settings, oversees projects, and has control over user assignments.",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      {
        roleName: "Project Manager",
        designation: "Project Manager",
        description:
          "Manages project timelines, assigns tasks, and tracks team performance.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: "Team Lead",
        designation: "Team Leader",
        description:
          "Leads a team of developers, assigns tasks, and ensures project milestones are met.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: "Senior Developer",
        designation: "Software Developer",
        description:
          "Handles complex development tasks and mentors junior developers.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: "Junior Developer",
        designation: "Software Developer",
        description:
          "Assists in development tasks and learns under the guidance of senior developers.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: "Quality Assurance Engineer",
        designation: "QA Engineer",
        description:
          "Tests software for bugs, ensures quality, and works closely with developers.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: "UI/UX Designer",
        designation: "Designer",
        description:
          "Designs user interfaces and ensures the software is user-friendly.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: "DevOps Engineer",
        designation: "Operations Engineer",
        description:
          "Manages deployments, CI/CD pipelines, and monitors system infrastructure.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: "Intern",
        designation: "Intern",
        description:
          "Learns development practices and assists in minor tasks under supervision.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // HR Department Roles
      {
        roleName: "HR Manager",
        designation: "Human Resources Manager",
        description:
          "Oversees recruitment, employee relations, and company policies.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   roleName: "Recruiter",
      //   designation: "Recruitment Specialist",
      //   description: "Sources and hires top talent for the company.",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      {
        roleName: "HR Assistant",
        designation: "HR Coordinator",
        description:
          "Assists in managing employee records and administrative tasks.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Business Development Department Roles
      {
        roleName: "BD Manager",
        designation: "Business Development Manager",
        description:
          "Develops strategies for business growth and manages client relationships.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: "BD Executive",
        designation: "Business Development Executive",
        description:
          "Assists in acquiring new clients and managing sales pipelines.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   roleName: "Marketing Specialist",
      //   designation: "Digital Marketing Specialist",
      //   description:
      //     "Promotes the company’s services through online marketing channels.",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   roleName: "Content Writer",
      //   designation: "Content Creator",
      //   description:
      //     "Creates written content for blogs, websites, and promotional materials.",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },

      // Accounts/Finance Department Roles
      {
        roleName: "Accounts Manager",
        designation: "Finance Manager",
        description:
          "Manages company finances, oversees budgets, and ensures compliance with financial regulations.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: "Accountant",
        designation: "Accountant",
        description:
          "Maintains financial records, processes invoices, and handles payroll.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   roleName: "Finance Analyst",
      //   designation: "Financial Analyst",
      //   description:
      //     "Analyzes financial data to provide insights and aid in decision-making.",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   roleName: "Billing Specialist",
      //   designation: "Billing Coordinator",
      //   description:
      //     "Manages client billing, tracks payments, and resolves discrepancies.",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
