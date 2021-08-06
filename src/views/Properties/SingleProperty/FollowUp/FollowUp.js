import React, { useEffect, useState } from "react";
import TaskItem from "./components/TaskItem";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import PropertyActions from "store/actions/property_actions";
import { getSinglePropertyAPI } from "api/property/property";
import PlaylistSkeleton from "core/Skeleton/PlaylistSkeleton";
import NewTask from "./components/NewTask";

const getSingleProperty = createSelector(
  (state) => state.property.single,
  (_, propertyId) => propertyId,
  (property, propertyId) => property[propertyId]
);

const FollowUp = (props) => {
  const propertyId = props.match.params.id;
  const userToken = useSelector((state) => state.user.token);
  const [, forceUpdate] = useState(0);

  const propertyData = useSelector((state) =>
    getSingleProperty(state, propertyId)
  );

  const loadSingleProperty = async () => {
    if (propertyData === undefined) {
      const response = await getSinglePropertyAPI(propertyId);
      PropertyActions.loadSingleProperty(propertyId, response);
    }
  };

  const onNewTask = (task) => {
    propertyData.followUp.unshift(task);
    forceUpdate((state) => state + 1);
  };

  useEffect(() => {
    loadSingleProperty();
  }, []);

  if (propertyData === undefined) {
    return <PlaylistSkeleton />;
  }

  return (
    <div>
      <NewTask onNewTask={onNewTask} propertyId={propertyId} />
      {propertyData.followUp &&
        propertyData.followUp.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            userToken={userToken}
            propertyId={propertyId}
          />
        ))}
    </div>
  );
};

export default FollowUp;
