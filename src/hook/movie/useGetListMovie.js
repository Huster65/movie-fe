import { useSave } from "@/stores/useStores";
import { isEmpty } from "lodash";
import cloneDeep from "lodash/cloneDeep";
import { useCallback, useEffect, useState } from "react";
import CatsServices from "@/services/cats.services";
import LoadingPageService from "@/services/loadingPage";

//* Check parse body request
const parseRequest = (filters) => {
  return cloneDeep({
    page: filters.page,
    page_size: filters.page_size,
  });
};

const useGetListCats = (filters, options = { isTrigger: true, refetchKey: "" }) => {
  //! State
  const { isTrigger = true, refetchKey = "" } = options;

  const save = useSave();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isRefetching, setRefetching] = useState(false);
  const [isFetchingPage, setFetchingPage] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  //! Function
  const fetch = useCallback(() => {
    if (!isTrigger) {
      return;
    }

    return new Promise((resolve, reject) => {
      (async () => {
        try {
          LoadingPageService.instance.current?.open();
          let nextFilters = undefined;
          if (filters) {
            nextFilters = parseRequest(filters);
          }
          const response = await CatsServices.getListCats(nextFilters);
          resolve(response);
        } catch (error) {
          setError(error);
          reject(error);
          setFetchingPage(false);
        } finally {
          LoadingPageService.instance.current.close();
        }
      })();
    });
  }, [filters, isTrigger]);

  const checkConditionPass = useCallback((response) => {
    //* Check condition of response here to set data
    if (!isEmpty(response?.data)) {
      setData(response.data);
      setHasMore(!isEmpty(response?.data));
    }
  }, []);

  const fetchChangePage = useCallback(
    async (shouldSetData) => {
      setFetchingPage(true);
      const response = await fetch();
      if (shouldSetData && response) {
        checkConditionPass(response);
      }

      setFetchingPage(false);
    },
    [fetch, checkConditionPass]
  );

  //* Refetch implicity (without changing loading state)
  const refetch = useCallback(async () => {
    try {
      setRefetching(true);
      let nextFilters = undefined;
      if (filters) {
        nextFilters = parseRequest(filters);
      }
      const response = await CatsServices.getListCats(nextFilters);
      checkConditionPass(response);
      setRefetching(false);
    } catch (error) {
      if (!error.isCanceled) {
        // showError(error);
      }
    }
  }, [filters]);

  useEffect(() => {
    save(refetchKey, refetch);
  }, [save, refetchKey, refetch]);

  //* Refetch with changing loading state
  const refetchWithLoading = useCallback(
    async (shouldSetData) => {
      try {
        setLoading(true);
        LoadingPageService.instance.current?.open();
        const response = await fetch();
        if (shouldSetData && response) {
          checkConditionPass(response);
        }
        setLoading(false);
        LoadingPageService.instance.current.close();
      } catch (error) {
        setError(error);
        LoadingPageService.instance.current.close();
        setLoading(false);
      }
    },
    [fetch, checkConditionPass]
  );

  useEffect(() => {
    let shouldSetData = true;
    if (filters?.page !== undefined && filters?.page <= 0) {
      refetchWithLoading(shouldSetData);
      return;
    }

    //* If offset > 0 -> fetch more
    fetchChangePage(shouldSetData);

    return () => {
      shouldSetData = false;
    };
  }, [filters?.page, fetchChangePage, refetchWithLoading]);

  return {
    data,
    isLoading,
    error,
    refetch,
    refetchWithLoading,
    isRefetching,
    isFetchingPage,
    hasMore,
    setData,
  };
};

export default useGetListCats;
