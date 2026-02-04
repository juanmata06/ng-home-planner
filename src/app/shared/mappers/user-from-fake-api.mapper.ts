import { FakeAPIUser, User } from "@shared/interfaces";

export function mapFakeApiUserToUser(fakeUser: FakeAPIUser): User {
  return {
    id: fakeUser.id.toString(),
    name: fakeUser.name,
    email: fakeUser.email,
    imgUrl: 'https://s1.ppllstatics.com/mujerhoy/www/multimedia/202502/11/media/cortadas/zuckeberg1-k7bF-U230828106152o7E-1248x1248@MujerHoy.jpg',
    userRole: 'User',
  };
}
