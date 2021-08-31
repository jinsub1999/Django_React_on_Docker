import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import {useHistory} from "react-router";
import serverRequest from "./ServerRelated";

export type votableItem = {
  upvotes: number;
  downvotes: number;
  upvoted?: boolean;
  downvoted?: boolean;
};

const VotingButtons = ({item, setItem, checkURL} : {
  item: votableItem;
  setItem: React.Dispatch < React.SetStateAction<votableItem> >;
  checkURL: string;
}) => {
  const hist = useHistory();
  const [votes, setVotes] = useState({up: 0, down: 0});
  useEffect(() => {
    setVotes({up: item.upvotes, down: item.downvotes});
  }, [item]);
  return (<div className="btn-group d-flex my-1">
    <button className="btn btn-success btn-sm" onClick={() => {
        if (item) {
          serverRequest({
            method: "POST",
            url: checkURL + "1/"
          }).then((res) => {
            if (res === "OK") {
              setItem({
                upvotes: item.upvoted
                  ? item.upvotes - 1
                  : item.upvotes + 1,
                downvotes: item.downvoted
                  ? item.downvotes - 1
                  : item.downvotes,
                upvoted: !item.upvoted,
                downvoted: false
              });
            } else if (res === "Login Required") {
              alert("로그인이 필요한 기능입니다.");
              hist.push("/login");
            }
          });
        }
      }}>
      <i className={`bi bi-hand-thumbs-up${item.upvoted
          ? "-fill"
          : ""}`}></i>
      <span className="mx-2">{votes.up}</span>
    </button>
    <button className="btn btn-secondary btn-sm" onClick={() => {
        if (item) {
          serverRequest({
            method: "POST",
            url: checkURL + "2/"
          }).then((res) => {
            if (res === "OK") {
              setItem({
                upvotes: item.upvoted
                  ? item.upvotes - 1
                  : item.upvotes,
                downvotes: item.downvoted
                  ? item.downvotes - 1
                  : item.downvotes + 1,
                upvoted: false,
                downvoted: !item.downvoted
              });
            } else if (res === "Login Required") {
              alert("로그인이 필요한 기능입니다.");
              hist.push("/login");
            }
          });
        }
      }}>
      <i className={`bi bi-hand-thumbs-down${item.downvoted
          ? "-fill"
          : ""}`}></i>
      <span className="mx-2">{item && votes.down}</span>
    </button>
  </div>);
};

export default VotingButtons;
