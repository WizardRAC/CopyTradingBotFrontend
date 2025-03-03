// GlobalState.ts
class GlobalState {
    private static instance: GlobalState;
    private userId: string | null = null;
  
    private constructor() {}
  
    public static getInstance(): GlobalState {
      if (!GlobalState.instance) {
        GlobalState.instance = new GlobalState();
      }
      return GlobalState.instance;
    }
  
    // Set the userId
    public setUserId(userId: string): void {
      this.userId = userId;
    }
  
    // Get the userId
    public getUserId(): string | null {
      return this.userId;
    }
  }
  
  export default GlobalState;
  