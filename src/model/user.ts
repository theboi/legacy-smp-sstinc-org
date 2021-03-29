import firebase from "firebase/app";

const admins = [
  // as of 3 June 2020, SST Inc EXCO 2020, 2019, BOD
  "koh_jie_ming_xavier@s2019.ssts.edu.sg",
  "ryan_theodore_the@s2019.ssts.edu.sg",
  "leong_yu_xuan_thaddeus@s2019.ssts.edu.sg",
  "joshua_lim_zhe_kai@s2019.ssts.edu.sg",
  "joe_wong@s2019.ssts.edu.sg",
  "granwyn_tan@s2019.ssts.edu.sg",
  "jayachandran_tanish@s2019.ssts.edu.sg",
  "chia_howie@s2019.ssts.edu.sg",
  "darius_koh_kai_keat@s2019.ssts.edu.sg",
  "chew_ming_hong_ethan@s2019.ssts.edu.sg",
  "karl_orjalo@s2018.ssts.edu.sg",
  "sebastian_choo_yong_qiang@s2017.sst.edu.sg",
  "santhiyaa_senthilkumar@s2018.ssts.edu.sg",
  "kesler_kok_weng_fong@s2018.ssts.edu.sg",
  "yeo_yi_axios@s2017.sst.edu.sg",
  "arash_nur_iman_b_m_a_s@s2018.ssts.edu.sg",
  "jonathan_tan_jiayi@s2018.ssts.edu.sg",
  "yee_jia_chen@s2017.sst.edu.sg",
  "qin_guan@s2017.sst.edu.sg",
  "koh_kai_sern@s2018.ssts.edu.sg",
  "carl_ian_voller@s2017.sst.edu.sg",
  "shannen_samuel_rajoo@s2017.sst.edu.sg",
  "aurelius_yeo@sst.edu.sg",
  "jonathan_chua@sst.edu.sg",
  "jovita_tang@sst.edu.sg",
  "pang_hee_tee_robin@sst.edu.sg",
];

export enum UserRole {
  Admin = "Admin",
  Member = "Member",
}

export class User {

  constructor(fbUser: firebase.User) {
    this._fbUser = fbUser
  }

  private _fbUser: firebase.User

  get role(): string {
    switch (true) {
      case admins.includes(this._fbUser?.email): return UserRole.Admin
      default: return UserRole.Member
    }
  }

  get email(): string {
    console.log(this._fbUser?.email)
    return this._fbUser?.email
  }

  get photoURL(): string {
    return this._fbUser.photoURL
  }
}