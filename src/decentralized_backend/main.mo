import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Hash "mo:base/Hash";
// import Option "mo:base/Option";

actor FreelanceMarketplace {

  type Job = {
    id : Nat;
    title : Text;
    description : Text;
    budget : Nat;
    category : Text;
    employer : Text;
    skills : [Text];
    datePosted : Time.Time;
    status : Text;
    bids : [Bid];
  };

  type Bid = {
    bidder : Text;
    amount : Nat;
    proposal : Text;
    timestamp : Time.Time;
  };

  stable var nextJobId : Nat = 0;

  func natHash(n : Nat) : Hash.Hash {
    Text.hash(Nat.toText(n));
  };

  private var jobs = HashMap.HashMap<Nat, Job>(0, Nat.equal, natHash);

  public func postJob(title : Text, description : Text, budget : Nat, category : Text, employer : Text, skills : [Text]) : async Nat {
    let jobId = nextJobId;
    let newJob : Job = {
      id = jobId;
      title = title;
      description = description;
      budget = budget;
      employer = employer;
      skills = skills;
      category = category;
      datePosted = Time.now();
      status = "Open";
      bids = [];
    };

    jobs.put(jobId, newJob);
    nextJobId += 1;
    jobId;
  };

  public query func getJob(id : Nat) : async ?Job {
    jobs.get(id);
  };

  public query func getAllJobs() : async [Job] {
    Array.tabulate<Job>(
      jobs.size(),
      func(i) {
        switch (jobs.get(i)) {
          case null {
            {
              id = 0;
              title = "";
              description = "";
              budget = 0;
              employer = "";
              category = "";
              skills = [];
              datePosted = 0;
              status = "";
              bids = [];
            };
          };
          case (?job) { job };
        };
      },
    );
  };

  public func updateJobStatus(id : Nat, newStatus : Text) : async Bool {
    switch (jobs.get(id)) {
      case null { false };
      case (?job) {
        let updatedJob : Job = {
          id = job.id;
          title = job.title;
          description = job.description;
          budget = job.budget;
          employer = job.employer;
          category = job.category;
          skills = job.skills;
          datePosted = job.datePosted;
          status = newStatus;
          bids = job.bids;
        };
        jobs.put(id, updatedJob);
        true;
      };
    };
  };

  public func deleteJob(id : Nat) : async Bool {
    switch (jobs.get(id)) {
      case null { false };
      case (?_job) {
        jobs.delete(id);
        true;
      };
    };
  };

  public func bidOnJob(jobId : Nat, bidder : Text, amount : Nat, proposal : Text) : async Bool {
    switch (jobs.get(jobId)) {
      case null { false };
      case (?job) {
        let newBid : Bid = {
          bidder = bidder;
          amount = amount;
          proposal = proposal;
          timestamp = Time.now();
        };
        let updatedJob : Job = {
          id = job.id;
          title = job.title;
          description = job.description;
          budget = job.budget;
          employer = job.employer;
          skills = job.skills;
          category = job.category;
          datePosted = job.datePosted;
          status = job.status;
          bids = Array.append(job.bids, [newBid]);
        };
        jobs.put(jobId, updatedJob);
        true;
      };
    };
  };

  public query func getJobBids(jobId : Nat) : async ?[Bid] {
    switch (jobs.get(jobId)) {
      case null { null };
      case (?job) { ?job.bids };
    };
  };
};
