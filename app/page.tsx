import axios from "axios";

export default async function Home() {
  const loginRes = await LoginToAppX("youremail", "yourpassword");
  console.log(loginRes);
  return (
    <main className="mx-auto max-w-screen-xl py-6">
      <AppxVideoPlayer course_id="14" video_id="3006" />
    </main>
  );
}

export async function AppxVideoPlayer({
  course_id,
  video_id,
}: {
  course_id: string;
  video_id: string;
}) {
  // Get this from the appx api
  const auth_token = "";
  const url = `https://harkiratapi.classx.co.in/get/fetchVideoDetailsById?course_id=${course_id}&video_id=${video_id}&ytflag=${1}&folder_wise_course=${1}`;

  const config = {
    url,
    method: "get",
    maxBodyLength: Infinity,
    headers: {
      Authorization: auth_token,
      "Auth-Key": "appxapi",
      "User-Id": "43916",
    },
  };
  const res = await axios.request(config);
  const videoUrl = res.data.data.video_player_url;
  const token = res.data.data.video_player_token;
  const username = "";
  const email = "";
  const url1 = `${videoUrl}${token}&watermark=${username}%0A${email}`;
  console.log(url1);

  return (
    <iframe
      src={`${videoUrl}${token}&watermark=${username}%0A${email}`}
      className="w-[80vw] h-[80vh] rounded-lg"
    ></iframe>
  );
}

type LoginToAppXResponse = {
  email: string;
  phone: string;
  token: string;
};

export async function LoginToAppX(
  username: string,
  password: string
): Promise<LoginToAppXResponse> {
  const loginUrl = "https://harkiratapi.classx.co.in/post/userLogin";
  const formData = new FormData();
  formData.append("phone", username);
  formData.append("email", username);
  formData.append("password", password);
  const config = {
    url: loginUrl,
    method: "post",
    headers: {
      "Auth-Key": "appxapi",
      //"Auth-Key": process.env.APPX_AUTH_KEY,
    },
    data: formData,
  };
  try {
    const response = await axios.request(config);
    return {
      email: response.data.data.email,
      phone: response.data.data.phone,
      token: response.data.data.token,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
