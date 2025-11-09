# Azure Log Analytics Setup - Complete! ✅

**Date**: November 9, 2025  
**Status**: ✅ **CONFIGURED AND RUNNING**

---

## ✅ What Was Set Up

### 1. **Log Analytics Workspace Created**
- **Name**: `staff-logs-workspace`
- **Location**: Southeast Asia
- **Resource Group**: `staff-sea-rg`
- **Workspace ID**: `81255fad-b352-42bd-8542-22f10c2bd31e`

### 2. **Container Apps Environment Updated**
- **Environment**: `staff-env`
- **Log Destination**: `log-analytics`
- **Status**: ✅ All 5 services now sending logs

### 3. **Services Restarted**
All services were restarted to begin sending logs:
- ✅ auth-service
- ✅ user-service  
- ✅ matching-service
- ✅ communication-service
- ✅ notification-service

---

## 📊 Accessing Your Logs

### **Option 1: Azure Portal (Recommended)**

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Resource Groups** → `staff-sea-rg`
3. Click on **Log Analytics workspace** → `staff-logs-workspace`
4. Click **Logs** in the left menu
5. Start querying your logs!

### **Option 2: Azure CLI**

```bash
# View all Container App logs (last 1 hour)
az monitor log-analytics query \
  --workspace 81255fad-b352-42bd-8542-22f10c2bd31e \
  --analytics-query "ContainerAppConsoleLogs_CL | where TimeGenerated > ago(1h) | order by TimeGenerated desc" \
  --output table
```

---

## 🔍 Useful Log Queries

### **1. View All Recent Logs (Last Hour)**
```kusto
ContainerAppConsoleLogs_CL
| where TimeGenerated > ago(1h)
| project TimeGenerated, ContainerAppName_s, Log_s
| order by TimeGenerated desc
```

### **2. Filter by Service**
```kusto
ContainerAppConsoleLogs_CL
| where TimeGenerated > ago(1h)
| where ContainerAppName_s == "auth-service"
| project TimeGenerated, Log_s
| order by TimeGenerated desc
```

### **3. Search for Errors**
```kusto
ContainerAppConsoleLogs_CL
| where TimeGenerated > ago(24h)
| where Log_s contains "error" or Log_s contains "ERROR"
| project TimeGenerated, ContainerAppName_s, Log_s
| order by TimeGenerated desc
```

### **4. Count Errors by Service**
```kusto
ContainerAppConsoleLogs_CL
| where TimeGenerated > ago(24h)
| where Log_s contains "error" or Log_s contains "ERROR"
| summarize ErrorCount = count() by ContainerAppName_s
| order by ErrorCount desc
```

### **5. Monitor API Requests**
```kusto
ContainerAppConsoleLogs_CL
| where TimeGenerated > ago(1h)
| where Log_s contains "POST" or Log_s contains "GET" or Log_s contains "PUT" or Log_s contains "DELETE"
| project TimeGenerated, ContainerAppName_s, Log_s
| order by TimeGenerated desc
```

### **6. Find Slow Requests (>1 second)**
```kusto
ContainerAppConsoleLogs_CL
| where TimeGenerated > ago(1h)
| where Log_s matches regex "\\d{4,}ms" // 1000ms or more
| project TimeGenerated, ContainerAppName_s, Log_s
| order by TimeGenerated desc
```

### **7. Login Activity Monitoring**
```kusto
ContainerAppConsoleLogs_CL
| where TimeGenerated > ago(24h)
| where ContainerAppName_s == "auth-service"
| where Log_s contains "login" or Log_s contains "LOGIN"
| project TimeGenerated, Log_s
| order by TimeGenerated desc
```

### **8. Database Connection Issues**
```kusto
ContainerAppConsoleLogs_CL
| where TimeGenerated > ago(24h)
| where Log_s contains "database" or Log_s contains "postgres" or Log_s contains "connection"
| where Log_s contains "error" or Log_s contains "timeout"
| project TimeGenerated, ContainerAppName_s, Log_s
| order by TimeGenerated desc
```

---

## 📈 Setting Up Alerts

### **Example: Alert on High Error Rate**

1. Go to Log Analytics workspace in Azure Portal
2. Click **Alerts** → **+ Create** → **Alert rule**
3. Set the following query:

```kusto
ContainerAppConsoleLogs_CL
| where TimeGenerated > ago(5m)
| where Log_s contains "error" or Log_s contains "ERROR"
| summarize ErrorCount = count()
| where ErrorCount > 10
```

4. Configure alert:
   - **Alert name**: High Error Rate
   - **Severity**: Warning (Sev 2)
   - **Frequency**: Every 5 minutes
   - **Threshold**: Whenever the result count is greater than 0

5. Add action group (email/SMS notification)

---

## 🎯 What You Get Now

### **Real-Time Monitoring**
- ✅ All console logs from all 5 services in one place
- ✅ Historical log data retention (default: 30 days, can extend to 730 days)
- ✅ Powerful query language (KQL) for searching and analyzing logs

### **Performance Insights**
- ✅ Track API response times
- ✅ Monitor error rates and patterns
- ✅ Identify slow queries and bottlenecks

### **Security & Compliance**
- ✅ Audit trail of all login attempts
- ✅ Track API access patterns
- ✅ Monitor for suspicious activity

### **Cost Optimization**
- ✅ Identify unused or inefficient services
- ✅ Track resource usage patterns
- ✅ Optimize based on actual usage data

---

## 💰 Cost Information

### **Log Analytics Pricing** (Pay-as-you-go)
- **First 5 GB/month**: FREE
- **Above 5 GB**: ~$2.76 per GB

### **Estimated Monthly Cost for Your Setup**
- **5 microservices** with moderate traffic
- **Expected log volume**: ~2-3 GB/month
- **Estimated cost**: **FREE** (under free tier) to ~$5/month

### **Tips to Reduce Costs**
1. Set log retention to 30 days (default) instead of 730 days
2. Use sampling for high-volume logs
3. Filter out unnecessary verbose logs in your application code
4. Archive old logs to cheaper blob storage if needed

---

## 🚀 Next Steps (Optional)

### **1. Application Insights (Advanced Telemetry)**
Add Application Insights for more detailed metrics:
- Request rates, response times, dependency tracking
- Custom metrics and events
- User analytics and session tracking

```bash
# Create Application Insights
az monitor app-insights component create \
  --app staff-app-insights \
  --location southeastasia \
  --resource-group staff-sea-rg \
  --workspace /subscriptions/bb83cf18-522d-4546-ba6b-39e219d3c0db/resourceGroups/staff-sea-rg/providers/Microsoft.OperationalInsights/workspaces/staff-logs-workspace
```

### **2. Custom Dashboards**
Create visual dashboards in Azure Portal:
- Service health overview
- Error rate trends
- API request volume
- Response time charts

### **3. Automated Alerts**
Set up alerts for:
- High error rates (> 10 errors in 5 minutes)
- Service downtime (no logs in 10 minutes)
- Slow API responses (> 2 seconds)
- Database connection failures

---

## 📖 Resources

- [Log Analytics Query Language (KQL) Tutorial](https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/)
- [Container Apps Logging and Monitoring](https://learn.microsoft.com/en-us/azure/container-apps/observability)
- [Log Analytics Pricing](https://azure.microsoft.com/en-us/pricing/details/monitor/)

---

## ✅ Verification

To verify logs are flowing:

```bash
# Wait 5-10 minutes for logs to start flowing, then query
az monitor log-analytics query \
  --workspace 81255fad-b352-42bd-8542-22f10c2bd31e \
  --analytics-query "ContainerAppConsoleLogs_CL | where TimeGenerated > ago(1h) | take 10" \
  --output table
```

You should see logs from your container apps!

---

**Status**: ✅ **SETUP COMPLETE - LOGS ARE NOW BEING COLLECTED!**

Log in to [Azure Portal](https://portal.azure.com) → Resource Groups → staff-sea-rg → staff-logs-workspace → Logs to start exploring!
