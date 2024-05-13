import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function usePost(url: string) {
  interface IData {
    msg?: string;
    session_token?: string;
    status?: number;
  }
  const [data, setData] = useState<IData | null>(null);
  const [status, setStatus] = useState<number>(null);

  const [token, setToken] = useState(null);

  const [error, setError] = useState(null);
  const [requestBody, setRequestBody] = useState<any | null>(null);

  const navigate = useNavigate();

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
        setStatus(postResponse.status);
      } catch (error: any) {
        if (error?.response?.status == 401) {
          localStorage.clear();
          navigate("/");
        }
        setStatus(error?.response?.status);

        setData(null);
        setError(error);
      }
    }

    fetchData();
  }, [url, requestBody]);

  return {
    data,
    error,
    status,
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
  const [status, setStatus] = useState<number>(null);

  const [token, setToken] = useState(null);

  const [error, setError] = useState(null);
  const [requestBody, setRequestBody] = useState<any | null>(null);
  const navigate = useNavigate();

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

        const patchResponse = session_token
          ? await axios.patch(url, requestBody, {
              headers: {
                Authorization: `Bearer ${session_token}`,
                "Content-Type": contentType ? contentType : "application/json",
              },
            })
          : await axios.patch(url, requestBody);

        setData(patchResponse.data);
        setStatus(patchResponse.status);
      } catch (error: any) {
        if (error?.response?.status == 401) {
          localStorage.clear();
          navigate("/");
        }
        setData(null);
        setStatus(error?.response?.status);

        setError(error);
      }
    }

    fetchData();
  }, [url, requestBody]);

  return {
    data,
    error,
    status,
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
  const [status, setStatus] = useState<number>(null);
  const [token, setToken] = useState(null);

  const [error, setError] = useState(null);
  const [requestBody, setRequestBody] = useState<any | null>(null);
  const navigate = useNavigate();

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
        const putResponse = session_token
          ? await axios.put(url, requestBody, {
              headers: {
                Authorization: `Bearer ${session_token}`,
                "Content-Type": contentType ? contentType : "application/json",
              },
            })
          : await axios.put(url, requestBody);
        putResponse.data.status = putResponse.status;
        if (putResponse.headers["authorization"]) {
          putResponse.data.session_token = putResponse.headers["authorization"];
        }

        setData(putResponse.data);
        setStatus(putResponse.status);
      } catch (error: any) {
        if (error?.response?.status == 401) {
          localStorage.clear();
          navigate("/");
        }
        setData(null);
        setStatus(error?.response?.status);

        setError(error);
      }
    }
    fetchData();
  }, [url, requestBody]);

  return {
    data,
    error,
    status,
    setNewRequestBody: (newRequestBody: any) => {
      setRequestBody(newRequestBody);
    },
  };
}

export function useGet(url: string) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<number>(null);

  const navigate = useNavigate();

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
        setStatus(response.status);

        setLoading(false);
      } catch (error: any) {
        if (error?.response?.status == 401) {
          localStorage.clear();
          navigate("/");
        }
        setStatus(error?.response?.status);

        setError(error);
        setLoading(false);
      }
    };
    if (url) {
      fetchData();
    }
  }, [url]);
  return {
    data,
    error,
    status,
    loading,
  };
}

export function useDelete(url: string) {
  const [error, setError] = useState(null);
  const [requestBody, setRequestBody] = useState(null);
  const [status, setStatus] = useState<number>(null);

  const [data, setData] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    async function deleteData() {
      try {
        const session_token = localStorage.getItem("session_token")
          ? localStorage.getItem("session_token")
          : null;
        const response = session_token
          ? await axios.delete(url, {
              headers: { Authorization: `Bearer ${session_token}` },
            })
          : await axios.delete(url);
        setData(response.data);
        setStatus(response.status);
      } catch (error: any) {
        if (error?.response?.status == 401) {
          localStorage.clear();
          navigate("/");
        }
        setStatus(error?.response?.status);

        setError(error);
      }
    }
    if (url) deleteData();
  }, [url, requestBody]);

  return {
    error,
    data,
    status,
    setNewRequestBody: (newRequestBody?: any) => {
      setRequestBody(newRequestBody);
    },
  };
}
