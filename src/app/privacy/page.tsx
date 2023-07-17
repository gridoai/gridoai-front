import React from "react";
import privacyPolicyContent from "./privacyPolicyContent.json"; // Path to your JSON file

const PrivacyPolicyPage = () => {
  const { title, lastUpdated, introduction, sections } = privacyPolicyContent;

  return (
    <div className="text-white bg-neutral-0 p-10">
      <h1 className="text-3xl font-bold mb-6 text-foreground">{title}</h1>
      <p className="mb-6 text-foreground">Last updated: {lastUpdated}</p>
      <div className="bg-neutral-1 p-6 border-2 border-neutral-2 rounded">
        <p className="mb-6">{introduction}</p>
        {sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">{section.header}</h2>
            <p>{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
