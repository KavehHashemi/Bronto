import { useEffect, useState } from "react";
import { ResourceType, ResourceListComponentProps } from "../Types";
import "../style/ResourcesDialog.css";
import SingleResourceComponent from "./SingleResourceComponent";

const ResourceListComponent = ({
  resources,
  calendarRef,
}: ResourceListComponentProps) => {
  const [currentResources, setCurrentResources] =
    useState<ResourceType[]>(resources);

  useEffect(() => {
    setCurrentResources(resources);
  }, [resources]);

  const resourceElements: JSX.Element[] = [];
  for (let i = 0; i < currentResources.length; i++) {
    resourceElements.push(
      <SingleResourceComponent resource={currentResources[i]} calendarRef={calendarRef} key={currentResources[i].id}></SingleResourceComponent>
    );
  }

  return <>{resourceElements}</>;
};

export default ResourceListComponent;
