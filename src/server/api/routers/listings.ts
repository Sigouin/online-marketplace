import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  list: publicProcedure.query(({ctx}) =>{
    return ctx.db.listing.findMany();
  }),
  get: publicProcedure
  .input(
    z.object({ listingId: z.string() })
  )
  .query(({ctx, input}) => {

    return ctx.db.listing.findUnique({
      where:{
        id: input.listingId,
      }
    })
  }),

  getMessage: protectedProcedure
  .query(async ({ input, ctx}) => {
    const userId = ctx.auth.userId;
   const listing = await ctx.db.listing.findMany({
      where: {
        userId,
      },
      include: {
        message: true
      }
    });
    return listing.flatMap((item) => item.message);
  }),

  sendMessage: protectedProcedure
  .input(
    z.object({ message: z.string(), listingId: z.string() })
  )
  .mutation(async ({ input, ctx}) => {
   const message = await ctx.db.message.create({
      data: {
        fromUser     : ctx.auth.userId,
        fromUserName : ctx.auth.user?.username ?? "unknown",
        listingId    : input.listingId,
        message      : input.message
      },
    });
    return message;
  }),

  create: protectedProcedure
  .input(
    z.object({ name: z.string(), description: z.string(), price: z.number() })
  )
  .mutation(async ({ input, ctx}) => {
   const listing = await ctx.db.listing.create({
      data: {
        ...input,
        userId: ctx.auth.userId,
      },
    });
    return listing
  })
});
