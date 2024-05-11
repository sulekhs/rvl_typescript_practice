import { AuthChecker } from "type-graphql";
import Context from "../types/context";

const authChecker: AuthChecker<Context> = ({root, args, context, info}) => {
    return !!context.user; //if user exists return true or return false
}

export default authChecker;