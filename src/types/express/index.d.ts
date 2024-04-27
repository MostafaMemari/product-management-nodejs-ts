import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
      colors?: Record<string, any>;
      categories: Record<string, any>;
      sellers: Record<string, any>;
    }
  }
}
