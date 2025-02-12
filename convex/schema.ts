import {defineSchema, defineTable} from "convex/server";
import { v } from "convex/values"

export default defineSchema({
    users: defineTable({
        userId: v.string(), //clerkId
        email: v.string(),
        name: v.string(),
        isPro: v.boolean(),
        proSince: v.optional(v.number()), //there is no date in v
        lemonSqueezyCustomerId: v.optional(v.string()), //if user is customer
        lemonSqueezyOrderId: v.optional(v.string()),
    }).index("by_user_id", ["userId"]), //for fetching

    codeExecutions: defineTable({
        userId: v.string(),
        language: v.string(), //programming language
        code: v.string(),
        output: v.optional(v.string()),
        error: v.optional(v.string())
    }).index("by_user_id", ["userId"]),

    snippets: defineTable({
        userId: v.string(),
        title: v.string(),
        language: v.string(),
        code: v.string(),
        userName: v.string(), //store user's name for easy access
    }).index("by_user_id", ["userId"]),

    snippetComments: defineTable({
        snippetId: v.id("snippets"),
        userId: v.string(),
        userName: v.string(),
        content: v.string(), // HTML content
    }).index("by_snippet_id", ["snippetId"]),

    stars: defineTable({
        userId: v.id("users"),
        snippetId: v.id("snippets")
    }).index("by_user_id", ["userId"])
      .index("by_snippet_id", ["snippetId"])
      .index("by_user_id_and_snippet_id", ["userId", "snippetId"])

});