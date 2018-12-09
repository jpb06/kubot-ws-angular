export declare class StarSystem {
  nickName: string;
  name: string;
  posX: number;
  posY: number;
}

function IsCapitalizedStarSystem(obj: any) : boolean {
  if (typeof obj.NickName !== "string" ||
    typeof obj.Name !== "string" ||
    typeof obj.PosX !== "number" ||
    typeof obj.PosY !== "number")
    return false;

  return true;
}

export function validateCapitalizedStarSystems(data: any): boolean {
  if (data === undefined || !Array.isArray(data)) {
    return false;
  }

  for (let i = 0; i < data.length; i++) {
    if (!IsCapitalizedStarSystem(data[i])) {
      return false;
    }
  }

  return true;
}
