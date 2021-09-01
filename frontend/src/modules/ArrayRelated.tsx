import {productT} from "../types/types";

export const sortingFilter = (fil : string) => {
  if (fil === "added_date") 
    return(a : productT, b : productT) => {
      if (new Date(a.added_date) > new Date(b.added_date)) 
        return -1;
      else 
        return 1;
      }
    ;
  else if (fil === "modded_date") 
    return(a : productT, b : productT) => {
      if (!a.modded_date && !b.modded_date) 
        return 0;
      else if (!a.modded_date) 
        return 1;
      else if (!b.modded_date) 
        return -1;
      else if (new Date(a.modded_date) > new Date(b.modded_date)) 
        return -1;
      else 
        return 1;
      }
    ;
  else if (fil === "upvote") 
    return(a : productT, b : productT) => {
      if (a.upvotes > b.upvotes) 
        return -1;
      else 
        return 1;
      }
    ;
  else if (fil === "downvote") 
    return(a : productT, b : productT) => {
      if (a.downvotes > b.downvotes) 
        return -1;
      else 
        return 1;
      }
    ;
  else 
    return(a : productT, b : productT) => {
      if (new Date(a.added_date) > new Date(b.added_date)) 
        return 1;
      else 
        return -1;
      }
    ;
  }
;
