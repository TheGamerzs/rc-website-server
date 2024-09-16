import ApplicationsResolvers from "./resolvers/Application.js";
import AuthResolvers from "./resolvers/Auth.js";
import CompanyResolvers from "./resolvers/Company.js";
import { GraphQLScalarType } from "graphql";
import ManagersResolvers from "./resolvers/Manager.js";
import MembersResolvers from "./resolvers/Member.js";
import PagedResolvers from "./resolvers/Paged.js";
import PayoutsResolvers from "./resolvers/Payout.js";
import PigsCashoutResolvers from "./resolvers/Pigs.js";
import RtsCashoutResolvers from "./resolvers/Rts.js";
import WebsiteCashoutResolvers from "./resolvers/Website.js";
import { combineResolvers } from "./lib/combineResolvers.js";

export default combineResolvers([
    {
        Date: new GraphQLScalarType({
            name: "Date",
            parseValue(value) {
                return new Date(value);
            },
            serialize(value) {
                if (typeof value === "string") return value;
                return value.toISOString();
            },
        }),
    },
    {
        JSON: new GraphQLScalarType({
            name: "JSON",
            parseValue(value) {
                return JSON.parse(value);
            },
            serialize(value) {
                if (typeof value === "object") return value;
                return JSON.stringify(value);
            },
        }),
    },
    ApplicationsResolvers,
    ManagersResolvers,
    MembersResolvers,
    PayoutsResolvers,
    PigsCashoutResolvers,
    RtsCashoutResolvers,
    WebsiteCashoutResolvers,
    AuthResolvers,
    CompanyResolvers,
    PagedResolvers,
]);
