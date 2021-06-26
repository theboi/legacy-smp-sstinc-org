import firebase from "firebase/app";

export class Atd {
  // readonly firestore = "atd";
  // checkedInToday = false;
  // async checkIn(user: User): Promise<boolean> {
  //   const ts = firebase.firestore.Timestamp.fromDate(new Date());
  //   const jsDate = ts.toDate();
  //   return firebase
  //     .firestore()
  //     .collection(this.firestore)
  //     .doc(
  //       `${jsDate.getDay()}-${jsDate.getMonth() + 1}-${jsDate.getFullYear()}-${
  //         user.name
  //       }`
  //     )
  //     .set({
  //       displayName: user.name,
  //       email: user.email,
  //       timestamp: ts,
  //       iid: user.iid,
  //     })
  //     .then(() => {
  //       this.checkedInToday = true;
  //       return true;
  //     })
  //     .catch((e) => {
  //       console.error("Atd: ", e);
  //       return false;
  //     });
  // }
  // async allUsers(): Promise<
  //   firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  // > {
  //   return firebase
  //     .firestore()
  //     .collection(this.firestore)
  //     .orderBy("timestamp", "desc")
  //     .get();
  // }
}
