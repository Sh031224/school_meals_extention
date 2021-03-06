import React, { useCallback, useEffect, useState } from "react";
import { goTo } from "react-chrome-extension-router";
import School from "../../assets/api/School";
import Search from "../../components/Search";
import MainPage from "../../pages/MainPage";
import ResponseType from "../../types/Response";

interface SchoolSearchResponse extends ResponseType {
  data: {
    school: Array<SchoolType>;
  };
}

interface SchoolType {
  school_name: string;
  school_locate: string;
  office_code: string;
  school_id: number;
}

const SearchContainer = () => {
  const [goBack, setGoBack] = useState<boolean>(false);
  const [schoolList, setSchoolList] = useState<Array<SchoolType>>([]);

  const [search, setSearch] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const storageCheck = useCallback(() => {
    const keys = ["school_id", "office_code"];

    chrome.storage.sync.get(keys, (items) => {
      if (items.office_code && items.school_id) {
        setGoBack(true);
      } else {
        setGoBack(false);
      }
    });
  }, []);

  useEffect(() => {
    storageCheck();
  }, [storageCheck]);

  const getSchoolList = useCallback(async () => {
    setLoading(true);
    setSchoolList([]);
    await School.SearchSchool(search)
      .then((res: SchoolSearchResponse) => {
        setSchoolList(res.data.school);
      })
      .catch((err: Error) => {});
    setLoading(false);
  }, [search]);

  const selectSchool = useCallback(
    (idx: number) => {
      const school_id = schoolList[idx].school_id;
      const office_code = schoolList[idx].office_code;

      chrome.storage.sync.set({ school_id, office_code });

      goTo(MainPage);
    },
    [schoolList]
  );

  return (
    <>
      <Search
        schoolList={schoolList}
        selectSchool={selectSchool}
        getSchoolList={getSchoolList}
        goBack={goBack}
        search={search}
        setSearch={setSearch}
        loading={loading}
      />
    </>
  );
};

export default SearchContainer;
