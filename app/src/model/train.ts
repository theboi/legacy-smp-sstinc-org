import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";

const getRepoContentPath = "GET /repos/{owner}/{repo}/contents/{path}";
const octokit = new Octokit();

class TrainProvider {
  #vocations: Vocation[];

  async reloadVocations(): Promise<void> {
    const res = await octokit.request(getRepoContentPath, {
      owner: "theboi",
      repo: "smp-sstinc-org",
      path: `/data/train`,
    });

    this.#vocations = Array.from(
      res.data as Endpoints[typeof getRepoContentPath]["response"]["data"] & {
        length: number /* Octokit typing missing length property */;
      },
      (e) => new Vocation(e.name)
    );
  }

  get vocations(): Promise<Vocation[]> {
    return (async () => {
      if (this.#vocations) return this.#vocations;
      await this.reloadVocations();
      return this.#vocations;
    })();
  }

  static get instance(): TrainProvider {
    return trainProvider;
  }
}

const trainProvider = new TrainProvider();

enum VocationSubject {
  ios = "ios",
  rct = "react",
  and = "android",
  des = "design",
}

class Vocation {
  vid: string;
  #trainings: Training[]; // Will be undefined until first required

  get subject(): VocationSubject {
    return VocationSubject[this.vid];
  }

  async reloadTrainings(): Promise<void> {
    // https://docs.github.com/en/rest/reference/repos#get-repository-content
    const res = await octokit.request(getRepoContentPath, {
      owner: "theboi",
      repo: "smp-sstinc-org",
      path: `/data/train/${this.vid}`,
    });

    this.#trainings = Array.from(
      res.data as Endpoints[typeof getRepoContentPath]["response"]["data"] & {
        length: number /* Octokit typing missing length property */;
      },
      (e) => new Training(e.name)
    );
  }

  get trainings(): Promise<Training[]> {
    return (async () => {
      if (this.#trainings) return this.#trainings;
      await this.reloadTrainings();
      return this.#trainings;
    })();
  }

  constructor(vid: string) {
    this.vid = vid;
  }
}

class Training {
  vid: string;
  tid: string;
  #drills: Drill[];

  get vocation(): Vocation {
    return new Vocation(this.vid);
  }

  get title(): string {
    return;
  }

  async reloadDrills(): Promise<void> {
    const res = await octokit.request(getRepoContentPath, {
      owner: "theboi",
      repo: "smp-sstinc-org",
      path: `/data/train/${this.vid}/${this.tid}`,
    });

    this.#drills = Array.from(
      res.data as Endpoints[typeof getRepoContentPath]["response"]["data"] & {
        length: number /* Octokit typing missing length property */;
      },
      (e) => new Drill(e.name, e.download_url)
    );
  }

  get drills(): Promise<Drill[]> {
    return (async () => {
      if (this.#drills) return this.#drills;
      await this.reloadDrills();
      return this.#drills;
    })();
  }

  constructor(tid: string) {
    this.vid = tid.split("_")[1];
    this.tid = tid.split("_").slice(1, 3).join("_");
  }
}

enum DrillType {
  sld,
  qui,
  art,
}

class Drill {
  vid: string;
  tid: string;
  did: string;
  type: DrillType;

  url: string;
  title: string;
  content: string;

  async reloadContent() {
    const res = await octokit.request("GET {url}", {
      url: this.url,
    });

    this.content = res.data;
  }

  constructor(did: string, url: string) {
    this.vid = did.split("_")[0];
    this.tid = did.split("_").slice(0, 2).join("_");
    this.did = did.split(".")[0];
    this.type = DrillType[did.split(".")[1]];
    this.url = url;
    this.reloadContent();
  }
}

export {
  TrainProvider,
  trainProvider,
  VocationSubject,
  Vocation,
  Training,
  DrillType,
  Drill,
};
