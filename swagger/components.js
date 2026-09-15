/**
 * Shared swagger definitions. This file has no executable code — it only
 * carries @swagger JSDoc components referenced via $ref from route files
 * so each route doesn't have to redeclare the same schemas/responses.
 *
 * @swagger
 * components:
 *   schemas:
 *     Trainer:
 *       type: object
 *       properties:
 *         TrainerID: { type: integer }
 *         FirstName: { type: string }
 *         LastName: { type: string }
 *         Specialization: { type: string }
 *         Email: { type: string }
 *         PhoneNumber: { type: string }
 *         HireDate: { type: string, format: date-time }
 *         lesson: { type: integer }
 *         fixedsalary: { type: integer }
 *     TrainerInput:
 *       type: object
 *       properties:
 *         FirstName: { type: string }
 *         LastName: { type: string }
 *         Specialization: { type: string }
 *         Email: { type: string }
 *         PhoneNumber: { type: string }
 *         lesson: { type: integer }
 *         fixedsalary: { type: integer }
 *     Member:
 *       type: object
 *       properties:
 *         MemberID: { type: integer }
 *         FirstName: { type: string }
 *         LastName: { type: string }
 *         Email: { type: string }
 *         PhoneNumber: { type: string }
 *         DateOfBirth: { type: string, format: date }
 *         Address: { type: string }
 *         JoinDate: { type: string, format: date-time }
 *         MembershipPlanID: { type: integer }
 *         Status: { type: string }
 *         lesson: { type: integer }
 *     MemberInput:
 *       type: object
 *       properties:
 *         FirstName: { type: string }
 *         LastName: { type: string }
 *         Email: { type: string }
 *         PhoneNumber: { type: string }
 *         DateOfBirth: { type: string, format: date }
 *         Address: { type: string }
 *         MembershipPlanID: { type: integer }
 *         Status: { type: string }
 *         lesson: { type: integer }
 *     Class:
 *       type: object
 *       properties:
 *         ClassID: { type: integer }
 *         ClassName: { type: string }
 *         ClassDescription: { type: string }
 *         ClassDate: { type: string, format: date }
 *         Duration: { type: integer }
 *         MaxParticipants: { type: integer }
 *         numofmember: { type: integer }
 *         TrainerID: { type: integer }
 *         price: { type: integer }
 *     ClassInput:
 *       type: object
 *       properties:
 *         TrainerID: { type: integer }
 *         ClassName: { type: string }
 *         ClassDescription: { type: string }
 *         ClassDate: { type: string, format: date }
 *         Duration: { type: integer }
 *         MaxParticipants: { type: integer }
 *     Feedback:
 *       type: object
 *       properties:
 *         FeedbackID: { type: integer }
 *         MemberID: { type: integer }
 *         TrainerID: { type: integer }
 *         Rating: { type: integer }
 *         Comments: { type: string }
 *         Date: { type: string, format: date-time }
 *     FeedbackInput:
 *       type: object
 *       properties:
 *         TrainerID: { type: integer }
 *         Rating: { type: integer }
 *         Comments: { type: string }
 *     MembershipPlan:
 *       type: object
 *       properties:
 *         MembershipPlanID: { type: integer }
 *         PlanName: { type: string }
 *         Price: { type: number }
 *         Duration: { type: integer }
 *         lesson: { type: integer }
 *         Description: { type: string }
 *     MembershipPlanInput:
 *       type: object
 *       properties:
 *         PlanName: { type: string }
 *         Price: { type: number }
 *         Duration: { type: integer }
 *         lesson: { type: integer }
 *         Description: { type: string }
 *     Equipment:
 *       type: object
 *       properties:
 *         EquipmentID: { type: integer }
 *         EquipmentName: { type: string }
 *         EquipmentType: { type: string }
 *         PurchaseDate: { type: string, format: date-time }
 *         LastMaintenanceDate: { type: string, format: date-time }
 *         Status: { type: string }
 *     EquipmentInput:
 *       type: object
 *       properties:
 *         EquipmentName: { type: string }
 *         EquipmentType: { type: string }
 *         PurchaseDate: { type: string, format: date-time }
 *         Status: { type: string }
 *     Maintenance:
 *       type: object
 *       properties:
 *         MaintenanceID: { type: integer }
 *         EquipmentID: { type: integer }
 *         MaintenanceDate: { type: string, format: date-time }
 *         Technician: { type: string }
 *         Notes: { type: string }
 *     MaintenanceInput:
 *       type: object
 *       properties:
 *         Technician: { type: string }
 *         Notes: { type: string }
 *   responses:
 *     NotFound:
 *       description: Resource not found.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message: { type: string }
 *     ServerError:
 *       description: Server error.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error: { type: string }
 */
