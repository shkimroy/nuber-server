import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { GetNearByDriversResponse } from "../../../types/graph";
import { Between } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    GetNearByDrivers: privateResolver(async(_, __, { req }): Promise<GetNearByDriversResponse> => {
      const user: User = req.user;
      const { lastLat, lastLng } = user;
      try {
        const drivers: User[] = await User.find({
          isDriving: true,
          lastLat: Between(lastLat - 0.05, lastLat + 0.05),
          lastLng: Between(lastLng - 0.05, lastLng + 0.05)
        });
        return {
          ok: true,
          error: null,
          drivers
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          drivers: null
        }
      }
    })
  }
}

export default resolvers;