import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import PaginationBar from "../../components/PaginationBar";
import { openModal } from "../common/modalSlice";
import { getUsersContent } from "./usersSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
  STORE_USERS_TYPE,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewUserModal = () => {
    dispatch(
      openModal({
        title: "Add New User",
        bodyType: MODAL_BODY_TYPES.USER_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewUserModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Users() {
  const dispatch = useDispatch();
  const { contents: userContent, pages } = useSelector((state) => state.users);
  const users = userContent[STORE_USERS_TYPE.GET_USERS_DATA];
  const userCreated = userContent[STORE_USERS_TYPE.CREATE_USER];
  const { currentPage, lastPage, nextPage, prePage, total } = pages;

  const [page, setPage] = useState(1);
  const [item_per_page, setItem_per_page] = useState(7);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(
      getUsersContent({
        page: page,
        item_per_page: item_per_page,
        search: search,
      })
    );
  }, [page, userCreated]);

  const getDummyStatus = (index) => {
    if (index % 5 === 0) return <div className="badge">Client</div>;
    else if (index % 5 === 1)
      return <div className="badge badge-primary">Support</div>;
    else if (index % 5 === 2)
      return <div className="badge badge-secondary">Manager</div>;
    else if (index % 5 === 3)
      return <div className="badge badge-accent">Admin</div>;
    else return <div className="badge badge-ghost">Owner</div>;
  };

  const deleteCurrentUser = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this user?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.USER_DELETE,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="User list"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email Id</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center space-x-3">
                        {/* <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={user.avatar} alt="Avatar" />
                          </div>
                        </div> */}
                        <div>
                          <div className="font-bold">{user.first_name}</div>
                          <div className="text-sm opacity-50">
                            {user.last_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{moment(user.created_at).format("DD MMM YY")}</td>
                    <td>{getDummyStatus(user.status)}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentUser(user.id)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-full pt-2 flex justify-center">
          <PaginationBar
            lastPage={lastPage}
            currentPage={currentPage}
            nextPage={nextPage}
            prePage={prePage}
            total={total}
            setPage={setPage}
            className="justify-between w-[400px]"
          />
        </div>
      </TitleCard>
    </>
  );
}

export default Users;
