import { useState, useEffect } from "react";
import axios from "axios";

export function usePost(url: string) {
  interface IData {
    msg?: string;
    session_token?: string;
    status?: number;
  }
  const [data, setData] = useState<IData | null>(null);
  const [token, setToken] = useState(null);

  const [error, setError] = useState(null);
  const [requestBody, setRequestBody] = useState<any | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        var contentType;
        if (requestBody.contentType) {
          contentType = requestBody.contentType;
          delete requestBody.contentType;
        }
        var session_token;
        if (requestBody.session_token) {
          session_token = requestBody.session_token;
          delete requestBody.session_token;
        }
        const postResponse = session_token
          ? await axios.post(url, requestBody, {
              headers: {
                Authorization: `Bearer ${session_token}`,
                "Content-Type": contentType ? contentType : "application/json",
              },
            })
          : await axios.post(url, requestBody);
        postResponse.data.status = postResponse.status;
        if (postResponse.headers["authorization"]) {
          postResponse.data.session_token =
            postResponse.headers["authorization"];
        }

        setData(postResponse.data);
      } catch (error: any) {
        setData(null);
        setError(error);
      }
    }
   
      fetchData();
    
  }, [url, requestBody]);

  return {
    data,
    error,
    setNewRequestBody: (newRequestBody: any) => {
      setRequestBody(newRequestBody);
    },
  };
}

export function usePatch(url: string) {
  interface IData {
    msg?: string;
    session_token?: string;
    status?: number;
  }
  const [data, setData] = useState<IData | null>(null);
  const [token, setToken] = useState(null);

  const [error, setError] = useState(null);
  const [requestBody, setRequestBody] = useState<any | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        var contentType;
        if (requestBody.contentType) {
          contentType = requestBody.contentType;
          delete requestBody.contentType;
        }
        var session_token;
        if (requestBody.session_token) {
          session_token = requestBody.session_token;
          delete requestBody.session_token;
        }

        const postResponse = session_token
          ? await axios.patch(url, requestBody, {
              headers: {
                Authorization: `Bearer ${session_token}`,
                "Content-Type": contentType ? contentType : "application/json",
              },
            })
          : await axios.patch(url, requestBody);

        setData(postResponse.data);
      } catch (error: any) {
        setData(null);
        setError(error);
      }
    }
  
      fetchData();
    
  }, [url, requestBody]);

  return {
    data,
    error,
    setNewRequestBody: (newRequestBody: any) => {
      setRequestBody(newRequestBody);
    },
  };
}

export function usePut(url: string) {
  interface IData {
    msg?: string;
    session_token?: string;
    status?: number;
  }
  const [data, setData] = useState<IData | null>(null);
  const [token, setToken] = useState(null);

  const [error, setError] = useState(null);
  const [requestBody, setRequestBody] = useState<any | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        var contentType;
        if (requestBody.contentType) {
          contentType = requestBody.contentType;
          delete requestBody.contentType;
        }
        var session_token;
        if (requestBody.session_token) {
          session_token = requestBody.session_token;
          delete requestBody.session_token;
        }
        const postResponse = session_token
          ? await axios.put(url, requestBody, {
              headers: {
                Authorization: `Bearer ${session_token}`,
                "Content-Type": contentType ? contentType : "application/json",
              },
            })
          : await axios.put(url, requestBody);
        postResponse.data.status = postResponse.status;
        if (postResponse.headers["authorization"]) {
          postResponse.data.session_token =
            postResponse.headers["authorization"];
        }

        setData(postResponse.data);
      } catch (error: any) {
        setData(null);
        setError(error);
      }
    }
      fetchData();
    
  }, [url, requestBody]);

  return {
    data,
    error,
    setNewRequestBody: (newRequestBody: any) => {
      setRequestBody(newRequestBody);
    },
  };
}

export function useGet(url: string) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session_token = localStorage.getItem("session_token")
          ? localStorage.getItem("session_token")
          : null;
        const response = session_token
          ? await axios.get(url, {
              headers: { Authorization: `Bearer ${session_token}` },
            })
          : await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return {
    data,
    error,
    loading,
  };
}



export function useDelete(url:string) {
  const [error, setError] = useState(null);
  const [requestBody, setRequestBody] = useState(null);

  useEffect(() => {
    async function deleteData() {
      try {

        const session_token = localStorage.getItem("session_token")
        ? localStorage.getItem("session_token")
        : null;
      const response = session_token
        ? axios.delete(url, { headers: { Authorization: `Bearer ${session_token}` } })
        : await axios.delete(url);

      } catch (error:any) {
        setError(error);
      }
    }
    
      deleteData();
    
  }, [url, requestBody]);

  return {
    error,
    setNewRequestBody: (newRequestBody?:any) => {
      setRequestBody(newRequestBody ? newRequestBody :  null);
    },
  };
}