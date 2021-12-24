import { useContext } from "react";
import { Avatar, List } from "antd";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import Link from "next/link";

const PeopleList = ({ people, handleFollow, handleUnfollow }) => {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "../images/logo.jpg";
    }
  };
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imageSource(user)} />}
              title={
                <div className="d-flex justify-content-between">
                  <Link href={`/user/${user.username}`}>
                    <a>{user.username}</a>
                  </Link>
                  {state &&
                  state.user &&
                  user.followers &&
                  user.followers.includes(state.user._id) ? (
                    <span
                      onClick={() => handleUnfollow(user)}
                      className="text-primary pointer"
                    >
                      Unfollow
                    </span>
                  ) : (
                    <span
                      onClick={() => handleFollow(user)}
                      className="text-primary pointer"
                    >
                      Follow
                    </span>
                  )}
                </div>
              }
              // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </>
  );
};
export default PeopleList;
