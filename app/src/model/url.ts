import firebase from "firebase/app";

export class Url {
  readonly firestore = "url";

  getURLsSnapshot(
    onSnapshot: (
      snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
    ) => void
  ): () => void {
    return firebase
      .firestore()
      .collection(this.firestore)
      .onSnapshot(onSnapshot);
  }

  async getURL(suffix: string): Promise<firebase.firestore.DocumentSnapshot> {
    return firebase
      .firestore()
      .collection(this.firestore)
      .doc(suffix)
      .get()
      .catch((e) => {
        console.error("Url: ", e);
        return e;
      });
  }

  async updateURL(suffix: string, url: string): Promise<boolean> {
    return firebase
      .firestore()
      .collection(this.firestore)
      .doc(suffix)
      .set({ url })
      .then(() => true)
      .catch(() => false);
  }

  async deleteURL(suffix: string): Promise<boolean> {
    console.log(this.firestore, suffix);
    return new Promise(() => false);
  }
}
