"use server"

import {
  DATABASE_ID,
  EMPLOYEE_COLLECTION_ID,
  databases,
} from "../appwrite.config";

import { parseStringify } from "../utils"


export const getEmployees = async () => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      EMPLOYEE_COLLECTION_ID!
    );

    return parseStringify(patients.documents);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};
