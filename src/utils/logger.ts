// 日志级别
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

// 日志类型
export enum LogType {
  SYSTEM = 'system',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  DEBUG = 'debug',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  type: LogType;
  message: string;
  data?: unknown;
  stack?: string;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private readonly MAX_LOG_SIZE = 1000; // 最大日志条数

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, type: LogType, message: string, data?: unknown): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${type}] ${message} ${data ? JSON.stringify(data) : ''}`;
  }

  private addLog(level: LogLevel, type: LogType, message: string, data?: unknown, stack?: string) {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      type,
      message,
      data,
      stack
    };

    this.logs.push(logEntry);
    
    // 如果日志超过最大限制，删除最早的日志
    if (this.logs.length > this.MAX_LOG_SIZE) {
      this.logs.shift();
    }

    // 在控制台打印日志
    console.log(this.formatMessage(level, type, message, data));
  }

  public debug(type: LogType, message: string, data?: unknown) {
    this.addLog(LogLevel.DEBUG, type, message, data);
  }

  public info(type: LogType, message: string, data?: unknown) {
    this.addLog(LogLevel.INFO, type, message, data);
  }

  public warn(type: LogType, message: string, data?: unknown) {
    this.addLog(LogLevel.WARN, type, message, data);
  }

  public error(type: LogType, message: string, error?: Error) {
    this.addLog(LogLevel.ERROR, type, message, error?.message, error?.stack);
  }

  public getLogs(): LogEntry[] {
    return [...this.logs];
  }

  public getLogsByType(type: LogType): LogEntry[] {
    return this.logs.filter(log => log.type === type);
  }

  public getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  public clearLogs() {
    this.logs = [];
  }

  public analyzeLogs(): {
    total: number;
    byType: Record<LogType, number>;
    byLevel: Record<LogLevel, number>;
    errors: LogEntry[];
  } {
    const analysis = {
      total: this.logs.length,
      byType: {} as Record<LogType, number>,
      byLevel: {} as Record<LogLevel, number>,
      errors: [] as LogEntry[]
    };

    // 初始化计数
    Object.values(LogType).forEach(type => {
      analysis.byType[type] = 0;
    });
    Object.values(LogLevel).forEach(level => {
      analysis.byLevel[level] = 0;
    });

    // 统计
    this.logs.forEach(log => {
      analysis.byType[log.type]++;
      analysis.byLevel[log.level]++;
      if (log.level === LogLevel.ERROR) {
        analysis.errors.push(log);
      }
    });

    return analysis;
  }
}

export const logger = Logger.getInstance(); 