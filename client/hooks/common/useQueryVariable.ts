export const useQueryVariable = (variable: string): string | undefined => {
  const query = window.location.search.substring(1);
  const vars = query.split("&");

  return (
    vars
      .find((variableInQuery) =>
        new RegExp(`${variable}=.+`).test(variableInQuery)
      )
      ?.substring(variable.length + 1) ?? undefined
  );
};
