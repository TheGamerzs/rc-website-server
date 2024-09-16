import { typeDef as ApplicationType } from "./resolvers/Application.js";
import { typeDef as AuthType } from "./resolvers/Auth.js";
import { typeDef as CompanyType } from "./resolvers/Company.js";
import { typeDef as ManagerType } from "./resolvers/Manager.js";
import { typeDef as MemberType } from "./resolvers/Member.js";
import { typeDef as PagedType } from "./resolvers/Paged.js";
import { typeDef as PayoutType } from "./resolvers/Payout.js";
import { typeDef as PigsType } from "./resolvers/Pigs.js";
import { typeDef as RtsType } from "./resolvers/Rts.js";
import { typeDef as WebsiteType } from "./resolvers/Website.js";
import { gql } from "apollo-server-express";

// graphql won't allow an empty type, so we give it a single empty param
const Query = gql`
    type Query {
        _empty: String
    }
`;

const Mutation = gql`
    type Mutation {
        _empty: String
    }
`;
export const typeDefs = gql`
    scalar Date,
    scalar JSON,
    ${Query},
    ${Mutation},
    ${ApplicationType},
    ${CompanyType},
    ${ManagerType},
    ${MemberType},
    ${PayoutType},
    ${PigsType},
    ${RtsType},
    ${WebsiteType},
    ${AuthType},
    ${PagedType}
`;
