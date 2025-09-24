import dotenv from "dotenv";
import path from "path";
import type { InitOptions } from "payload/config";
import payload, { Payload } from "payload";
import nodemailer from "nodemailer"

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 465,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY
  }
})

let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    Promise: null, 
  };
}

interface Args {
  InitOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async  ({ 
  InitOptions,
 }: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is missing");
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      email:{
        transport: transporter,
        fromAddress: "onboarding@resend.dev",
        fromName: "ReTrash"
      },
      secret: process.env.PAYLOAD_SECRET || '',
      local: InitOptions?.express ? false : true,
      ...(InitOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (e: unknown) {
    cached.promise = null;
    throw e;
  }
  return cached.client;
}
