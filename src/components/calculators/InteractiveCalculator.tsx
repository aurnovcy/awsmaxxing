import React, { useState } from 'react';
import { PRICING_CONSTANTS } from '../../data/pricing-constants';
import { CheckCircle2, AlertTriangle, ArrowRight, TrendingDown } from 'lucide-react';

interface Props {
  calculatorId: string;
}

export const InteractiveCalculator: React.FC<Props> = ({ calculatorId }) => {
  // 1. NAT vs VPC Endpoint
  const [natGb, setNatGb] = useState<number>(2500);
  const [natAzs, setNatAzs] = useState<number>(2);

  // 2. gp2 to gp3
  const [gp2Gb, setGp2Gb] = useState<number>(5000);
  const [gp2Volumes, setGp2Volumes] = useState<number>(20);

  // 3. Public IPv4
  const [ipv4Count, setIpv4Count] = useState<number>(45);
  const [idleEipCount, setIdleEipCount] = useState<number>(5);

  // 4. EKS & RDS Extended Support
  const [eksClusters, setEksClusters] = useState<number>(3);
  const [rdsVcpus, setRdsVcpus] = useState<number>(32);
  const [supportMonths, setSupportMonths] = useState<number>(12);

  // 5. Savings Plans Simulator
  const [monthlyCompute, setMonthlyCompute] = useState<number>(15000);
  const [targetCoverage, setTargetCoverage] = useState<number>(75);
  const [spTerm, setSpTerm] = useState<'1yr' | '3yr'>('1yr');

  // 6. DB SP vs RI
  const [monthlyDbSpend, setMonthlyDbSpend] = useState<number>(8000);
  const [serverlessShare, setServerlessShare] = useState<number>(30);

  // 7. Non-Prod Scheduling
  const [devSpend, setDevSpend] = useState<number>(4500);
  const [hoursPerDay, setHoursPerDay] = useState<number>(12);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);

  // 8. Bedrock Estimator
  const [inputTokensMillions, setInputTokensMillions] = useState<number>(50);
  const [outputTokensMillions, setOutputTokensMillions] = useState<number>(15);
  const [cacheHitRate, setCacheHitRate] = useState<number>(60);
  const [batchShare, setBatchShare] = useState<number>(40);

  // 9. S3 Intelligent-Tiering
  const [s3TotalTb, setS3TotalTb] = useState<number>(75);
  const [s3ObjectThousands, setS3ObjectThousands] = useState<number>(300);
  const [coldShare, setColdShare] = useState<number>(65);

  // 10. Post-Credit Cliff
  const [creditBalance, setCreditBalance] = useState<number>(35000);
  const [monthlyBurn, setMonthlyBurn] = useState<number>(6000);
  const [monthsToCalendarExpiry, setMonthsToCalendarExpiry] = useState<number>(9);

  return (
    <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-6 my-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#1f1f1f] mb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#a1a1a1] font-mono">Interactive Model</span>
          <h3 className="text-base font-semibold text-white mt-0.5">Live Parameter Simulator</h3>
        </div>
        <div className="text-xs text-[#a1a1a1] font-mono">
          Estimates · Verify on AWS pricing
        </div>
      </div>

      {/* 1. NAT vs VPC Endpoint */}
      {calculatorId === 'nat-vs-endpoint' && (() => {
        const natCost = natGb * PRICING_CONSTANTS.NAT_GATEWAY_DATA_PROCESSING.value;
        const endpointHourly = natAzs * PRICING_CONSTANTS.VPC_INTERFACE_ENDPOINT_HOURLY.value * 730;
        const endpointData = natGb * PRICING_CONSTANTS.VPC_INTERFACE_ENDPOINT_DATA.value;
        const endpointCost = endpointHourly + endpointData;
        const netSavings = natCost - endpointCost;
        const breakEvenGb = Math.round(endpointHourly / (PRICING_CONSTANTS.NAT_GATEWAY_DATA_PROCESSING.value - PRICING_CONSTANTS.VPC_INTERFACE_ENDPOINT_DATA.value));

        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Monthly S3/API Data Processed: <span className="font-mono text-[#ff6b00]">{natGb.toLocaleString()} GB</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="20000"
                  step="100"
                  value={natGb}
                  onChange={(e) => setNatGb(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#707070] font-mono mt-1">
                  <span>100 GB</span>
                  <span>10,000 GB</span>
                  <span>20,000 GB</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Availability Zones: <span className="font-mono text-[#ff6b00]">{natAzs} AZs</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  value={natAzs}
                  onChange={(e) => setNatAzs(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#707070] font-mono mt-1">
                  <span>1 AZ</span>
                  <span>2 AZs</span>
                  <span>3 AZs</span>
                  <span>4 AZs</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1f1f1f]">
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Current NAT Processing</div>
                <div className="text-xl font-mono font-bold text-white mt-1">${natCost.toFixed(2)}<span className="text-xs text-[#a1a1a1]">/mo</span></div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">@ $0.045/GB</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Interface Endpoint Cost</div>
                <div className="text-xl font-mono font-bold text-white mt-1">${endpointCost.toFixed(2)}<span className="text-xs text-[#a1a1a1]">/mo</span></div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">${endpointHourly.toFixed(0)} base + $0.01/GB</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Net Monthly Savings</div>
                <div className={`text-xl font-mono font-bold mt-1 ${netSavings > 0 ? 'text-[#ff6b00]' : 'text-[#f59e0b]'}`}>
                  {netSavings > 0 ? `+$${netSavings.toFixed(2)}` : `-$${Math.abs(netSavings).toFixed(2)}`}
                </div>
                <div className="text-[11px] text-[#a1a1a1] mt-1 font-mono">Break-even: {breakEvenGb} GB/mo</div>
              </div>
            </div>

            <div className="p-3 bg-[#111111] rounded border border-[#1f1f1f] text-xs text-[#ededed] flex items-center justify-between">
              <span>Note: For Amazon S3 and DynamoDB, use <strong>Gateway Endpoints</strong> which are 100% free ($0.00/mo, $0.00/GB).</span>
              <span className="font-mono text-[#ff6b00] shrink-0 font-medium ml-2">Tip NET-02</span>
            </div>
          </div>
        );
      })()}

      {/* 2. gp2 to gp3 */}
      {calculatorId === 'gp2-to-gp3' && (() => {
        const gp2Cost = gp2Gb * PRICING_CONSTANTS.EBS_GP2_PER_GB.value;
        const gp3Cost = gp2Gb * PRICING_CONSTANTS.EBS_GP3_PER_GB.value;
        const monthlySavings = gp2Cost - gp3Cost;
        const annualSavings = monthlySavings * 12;

        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Total EBS gp2 Storage: <span className="font-mono text-[#ff6b00]">{gp2Gb.toLocaleString()} GB</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="50000"
                  step="250"
                  value={gp2Gb}
                  onChange={(e) => setGp2Gb(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#707070] font-mono mt-1">
                  <span>100 GB</span>
                  <span>25,000 GB</span>
                  <span>50,000 GB</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Number of Volumes: <span className="font-mono text-[#ff6b00]">{gp2Volumes} volumes</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="200"
                  step="1"
                  value={gp2Volumes}
                  onChange={(e) => setGp2Volumes(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#707070] font-mono mt-1">
                  <span>1</span>
                  <span>100</span>
                  <span>200</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1f1f1f]">
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Current gp2 Spend</div>
                <div className="text-xl font-mono font-bold text-white mt-1">${gp2Cost.toFixed(2)}<span className="text-xs text-[#a1a1a1]">/mo</span></div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">$0.10/GB-month</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">gp3 Equivalent Spend</div>
                <div className="text-xl font-mono font-bold text-[#ff6b00] mt-1">${gp3Cost.toFixed(2)}<span className="text-xs text-[#a1a1a1]">/mo</span></div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">$0.08/GB-month (-20%)</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Annual Cash Savings</div>
                <div className="text-xl font-mono font-bold text-[#ff6b00] mt-1">${annualSavings.toFixed(2)}<span className="text-xs text-[#a1a1a1]">/yr</span></div>
                <div className="text-[11px] text-[#a1a1a1] mt-1 font-mono">+ 3,000 baseline IOPS free</div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 3. Public IPv4 Cost */}
      {calculatorId === 'public-ipv4' && (() => {
        const totalIps = ipv4Count + idleEipCount;
        const monthlyCost = totalIps * PRICING_CONSTANTS.PUBLIC_IPV4_HOURLY.value * 730;
        const annualCost = monthlyCost * 12;
        const idleWasteAnnual = idleEipCount * PRICING_CONSTANTS.PUBLIC_IPV4_HOURLY.value * 730 * 12;

        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  In-Use Public IPv4 Addresses: <span className="font-mono text-[#ff6b00]">{ipv4Count} IPs</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="300"
                  step="5"
                  value={ipv4Count}
                  onChange={(e) => setIpv4Count(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="text-[11px] text-[#707070] font-mono mt-1">EC2 instances, ALBs, NAT Gateways</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Unattached / Idle Elastic IPs: <span className="font-mono text-[#ef4444]">{idleEipCount} IPs</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={idleEipCount}
                  onChange={(e) => setIdleEipCount(Number(e.target.value))}
                  className="w-full accent-[#ef4444] cursor-pointer"
                />
                <div className="text-[11px] text-[#707070] font-mono mt-1">Pure waste - release immediately</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1f1f1f]">
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Total Public IPs</div>
                <div className="text-xl font-mono font-bold text-white mt-1">{totalIps} <span className="text-xs text-[#a1a1a1]">addresses</span></div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">$0.005/IP-hour</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Total Annual Charge</div>
                <div className="text-xl font-mono font-bold text-white mt-1">${annualCost.toFixed(2)}<span className="text-xs text-[#a1a1a1]">/yr</span></div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">${monthlyCost.toFixed(2)}/month</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Idle IP Waste</div>
                <div className="text-xl font-mono font-bold text-[#ef4444] mt-1">${idleWasteAnnual.toFixed(2)}<span className="text-xs text-[#a1a1a1]">/yr</span></div>
                <div className="text-[11px] text-[#a1a1a1] mt-1 font-mono">Action: tip NET-09</div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 4. EKS & RDS Extended Support */}
      {calculatorId === 'eks-rds-extended-support' && (() => {
        const eksSurcharge = eksClusters * (PRICING_CONSTANTS.EKS_EXTENDED_CONTROL_PLANE.value - PRICING_CONSTANTS.EKS_STANDARD_CONTROL_PLANE.value) * 730 * supportMonths;
        const rdsSurcharge = rdsVcpus * PRICING_CONSTANTS.RDS_EXTENDED_SUPPORT_Y1_Y2.value * 730 * supportMonths;
        const totalAvoidableSurcharge = eksSurcharge + rdsSurcharge;

        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  EKS Clusters on Extended Support: <span className="font-mono text-[#ff6b00]">{eksClusters}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={eksClusters}
                  onChange={(e) => setEksClusters(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="text-[11px] text-[#707070] font-mono mt-1">$0.60/hr vs $0.10/hr</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  RDS vCPUs on Extended Support: <span className="font-mono text-[#ff6b00]">{rdsVcpus} vCPUs</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="256"
                  step="4"
                  value={rdsVcpus}
                  onChange={(e) => setRdsVcpus(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="text-[11px] text-[#707070] font-mono mt-1">$0.10/vCPU-hr surcharge</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Months in Extended Support: <span className="font-mono text-[#ff6b00]">{supportMonths} mos</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="24"
                  step="1"
                  value={supportMonths}
                  onChange={(e) => setSupportMonths(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="text-[11px] text-[#707070] font-mono mt-1">Upgrade duration window</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1f1f1f]">
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">EKS Control Plane Tax</div>
                <div className="text-xl font-mono font-bold text-[#f59e0b] mt-1">${eksSurcharge.toFixed(2)}</div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">+ $365/cluster-month</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">RDS Engine Support Tax</div>
                <div className="text-xl font-mono font-bold text-[#f59e0b] mt-1">${rdsSurcharge.toFixed(2)}</div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">+ $73/vCPU-month</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Total Avoidable Penalty</div>
                <div className="text-xl font-mono font-bold text-[#ef4444] mt-1">${totalAvoidableSurcharge.toFixed(2)}</div>
                <div className="text-[11px] text-[#a1a1a1] mt-1 font-mono">Action: Upgrade to save</div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 5. Savings Plans Simulator */}
      {calculatorId === 'savings-plans-simulator' && (() => {
        const discountRate = spTerm === '1yr' ? 0.28 : 0.45;
        const eligibleBaseline = monthlyCompute * (targetCoverage / 100);
        const hourlySpendOnDemand = eligibleBaseline / 730;
        const hourlyCommitment = hourlySpendOnDemand * (1 - discountRate);
        const committedMonthlyCost = hourlyCommitment * 730;
        const uncommittedMonthlyCost = monthlyCompute - eligibleBaseline;
        const newMonthlyTotal = committedMonthlyCost + uncommittedMonthlyCost;
        const monthlySavings = monthlyCompute - newMonthlyTotal;
        const esr = (monthlySavings / monthlyCompute) * 100;

        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Monthly Compute Spend: <span className="font-mono text-[#ff6b00]">${monthlyCompute.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="2000"
                  max="100000"
                  step="1000"
                  value={monthlyCompute}
                  onChange={(e) => setMonthlyCompute(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="text-[11px] text-[#707070] font-mono mt-1">EC2, Fargate, Lambda</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Target Coverage: <span className="font-mono text-[#ff6b00]">{targetCoverage}%</span>
                </label>
                <input
                  type="range"
                  min="40"
                  max="95"
                  step="5"
                  value={targetCoverage}
                  onChange={(e) => setTargetCoverage(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="text-[11px] text-[#707070] font-mono mt-1">Recommended: 70%–85%</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">Term</label>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => setSpTerm('1yr')}
                    className={`flex-1 py-1.5 px-3 text-xs font-mono rounded border transition-colors ${
                      spTerm === '1yr'
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-[#a1a1a1] border-[#1f1f1f] hover:border-[#383838]'
                    }`}
                  >
                    1-Year (~28% off)
                  </button>
                  <button
                    onClick={() => setSpTerm('3yr')}
                    className={`flex-1 py-1.5 px-3 text-xs font-mono rounded border transition-colors ${
                      spTerm === '3yr'
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-[#a1a1a1] border-[#1f1f1f] hover:border-[#383838]'
                    }`}
                  >
                    3-Year (~45% off)
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-[#1f1f1f]">
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Hourly Commitment</div>
                <div className="text-xl font-mono font-bold text-white mt-1">${hourlyCommitment.toFixed(2)}<span className="text-xs text-[#a1a1a1]">/hr</span></div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">${committedMonthlyCost.toFixed(0)}/mo committed</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">New Total Bill</div>
                <div className="text-xl font-mono font-bold text-[#ff6b00] mt-1">${newMonthlyTotal.toFixed(0)}<span className="text-xs text-[#a1a1a1]">/mo</span></div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">vs ${monthlyCompute.toFixed(0)} on-demand</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Monthly Savings</div>
                <div className="text-xl font-mono font-bold text-[#ff6b00] mt-1">${monthlySavings.toFixed(0)}<span className="text-xs text-[#a1a1a1]">/mo</span></div>
                <div className="text-[11px] text-[#a1a1a1] mt-1 font-mono">${(monthlySavings * 12).toFixed(0)}/year</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Effective Savings Rate</div>
                <div className="text-xl font-mono font-bold text-[#ff6b00] mt-1">{esr.toFixed(1)}%</div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">ESR metric</div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 6. DB SP vs RI */}
      {calculatorId === 'db-sp-vs-ri' && (() => {
        const serverlessAmount = monthlyDbSpend * (serverlessShare / 100);
        const provisionedAmount = monthlyDbSpend - serverlessAmount;

        // DB SP: 32% discount, covers both provisioned Gen 7+ and serverless
        const dbSpSavings = monthlyDbSpend * 0.32;
        // 1-Yr Standard RI: 34% discount, but ONLY on provisioned instances (0% on serverless)
        const riSavings = provisionedAmount * 0.34;

        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Monthly Database Spend: <span className="font-mono text-[#ff6b00]">${monthlyDbSpend.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="2000"
                  max="50000"
                  step="1000"
                  value={monthlyDbSpend}
                  onChange={(e) => setMonthlyDbSpend(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Serverless & DynamoDB Share: <span className="font-mono text-[#ff6b00]">{serverlessShare}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={serverlessShare}
                  onChange={(e) => setServerlessShare(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="text-[11px] text-[#707070] font-mono mt-1">Aurora Serverless, DynamoDB, ElastiCache Serverless</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1f1f1f]">
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Database Savings Plan Savings</div>
                <div className="text-xl font-mono font-bold text-[#ff6b00] mt-1">${dbSpSavings.toFixed(2)}<span className="text-xs text-[#a1a1a1]">/mo</span></div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">Floats across Gen 7+ & serverless</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Traditional 1-Yr RI Savings</div>
                <div className="text-xl font-mono font-bold text-white mt-1">${riSavings.toFixed(2)}<span className="text-xs text-[#a1a1a1]">/mo</span></div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">Excludes serverless usage</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Recommendation</div>
                <div className="text-sm font-semibold text-white mt-1">
                  {dbSpSavings >= riSavings ? 'Database Savings Plan Wins' : 'Traditional RI on Provisioned'}
                </div>
                <div className="text-[11px] text-[#a1a1a1] mt-1 font-mono">
                  {serverlessShare > 10 ? 'Serverless coverage tips balance to SP' : 'Pure provisioned fleet'}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 7. Non-Prod Scheduling */}
      {calculatorId === 'non-prod-scheduling' && (() => {
        const activeHours = hoursPerDay * daysPerWeek * 4.33; // ~avg weeks in month
        const idleHours = 730 - activeHours;
        const savingsRatio = Math.max(0, idleHours / 730);
        const monthlySavings = devSpend * savingsRatio;

        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Dev/Test Monthly Spend: <span className="font-mono text-[#ff6b00]">${devSpend.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="500"
                  max="25000"
                  step="250"
                  value={devSpend}
                  onChange={(e) => setDevSpend(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Active Hours Per Day: <span className="font-mono text-[#ff6b00]">{hoursPerDay} hrs/day</span>
                </label>
                <input
                  type="range"
                  min="8"
                  max="24"
                  step="1"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="text-[11px] text-[#707070] font-mono mt-1">e.g. 8 AM to 8 PM = 12 hrs</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Days Per Week: <span className="font-mono text-[#ff6b00]">{daysPerWeek} days</span>
                </label>
                <input
                  type="range"
                  min="4"
                  max="7"
                  step="1"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="text-[11px] text-[#707070] font-mono mt-1">Weekdays = 5 days</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1f1f1f]">
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Active Runtime</div>
                <div className="text-xl font-mono font-bold text-white mt-1">{Math.round(activeHours)} <span className="text-xs text-[#a1a1a1]">hrs/mo</span></div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">{(savingsRatio * 100).toFixed(1)}% off-hours</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">New Dev Spend</div>
                <div className="text-xl font-mono font-bold text-[#ff6b00] mt-1">${(devSpend - monthlySavings).toFixed(2)}<span className="text-xs text-[#a1a1a1]">/mo</span></div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">Scaled to scheduled hours</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Annual Cash Saved</div>
                <div className="text-xl font-mono font-bold text-[#ff6b00] mt-1">${(monthlySavings * 12).toFixed(2)}<span className="text-xs text-[#a1a1a1]">/yr</span></div>
                <div className="text-[11px] text-[#a1a1a1] mt-1 font-mono">Action: AWS Instance Scheduler</div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 8. Bedrock Estimator */}
      {calculatorId === 'bedrock-estimator' && (() => {
        // Base rate for Claude 3.5 Sonnet: Input $3.00/M, Output $15.00/M
        const rawInputCost = inputTokensMillions * 3.0;
        const rawOutputCost = outputTokensMillions * 15.0;
        const unoptimizedTotal = rawInputCost + rawOutputCost;

        // Prompt caching discounts up to 90% of cached input
        const cachedInputTokens = inputTokensMillions * (cacheHitRate / 100);
        const uncachedInputTokens = inputTokensMillions - cachedInputTokens;
        const cachedInputCost = (cachedInputTokens * 0.3) + (uncachedInputTokens * 3.0);

        // Batch processing cuts 50% on batch output
        const batchOutputTokens = outputTokensMillions * (batchShare / 100);
        const realTimeOutputTokens = outputTokensMillions - batchOutputTokens;
        const batchOutputCost = (batchOutputTokens * 7.5) + (realTimeOutputTokens * 15.0);

        const optimizedTotal = cachedInputCost + batchOutputCost;
        const monthlySavings = unoptimizedTotal - optimizedTotal;

        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Monthly Input Tokens: <span className="font-mono text-[#ff6b00]">{inputTokensMillions}M</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="250"
                  step="5"
                  value={inputTokensMillions}
                  onChange={(e) => setInputTokensMillions(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Monthly Output Tokens: <span className="font-mono text-[#ff6b00]">{outputTokensMillions}M</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="2"
                  value={outputTokensMillions}
                  onChange={(e) => setOutputTokensMillions(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Prompt Cache Hit: <span className="font-mono text-[#ff6b00]">{cacheHitRate}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="90"
                  step="5"
                  value={cacheHitRate}
                  onChange={(e) => setCacheHitRate(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="text-[11px] text-[#707070] font-mono mt-1">90% off cached input</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Batch Inference Share: <span className="font-mono text-[#ff6b00]">{batchShare}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="80"
                  step="5"
                  value={batchShare}
                  onChange={(e) => setBatchShare(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="text-[11px] text-[#707070] font-mono mt-1">50% off async jobs</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1f1f1f]">
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Unoptimized On-Demand</div>
                <div className="text-xl font-mono font-bold text-white mt-1">${unoptimizedTotal.toFixed(2)}<span className="text-xs text-[#a1a1a1]">/mo</span></div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">Standard list rates</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Optimized (Caching + Batch)</div>
                <div className="text-xl font-mono font-bold text-[#ff6b00] mt-1">${optimizedTotal.toFixed(2)}<span className="text-xs text-[#a1a1a1]">/mo</span></div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">{((monthlySavings / unoptimizedTotal) * 100).toFixed(1)}% bill reduction</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Monthly Savings</div>
                <div className="text-xl font-mono font-bold text-[#ff6b00] mt-1">${monthlySavings.toFixed(2)}<span className="text-xs text-[#a1a1a1]">/mo</span></div>
                <div className="text-[11px] text-[#a1a1a1] mt-1 font-mono">${(monthlySavings * 12).toFixed(0)}/yr</div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 9. S3 Intelligent-Tiering */}
      {calculatorId === 's3-intelligent-tiering' && (() => {
        const standardCost = s3TotalTb * 1000 * 0.023;
        const coldGb = s3TotalTb * 1000 * (coldShare / 100);
        const hotGb = (s3TotalTb * 1000) - coldGb;
        const monitoringFee = s3ObjectThousands * 0.0025;
        const tieredCost = (hotGb * 0.023) + (coldGb * 0.004) + monitoringFee;
        const monthlySavings = standardCost - tieredCost;

        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Total S3 Storage: <span className="font-mono text-[#ff6b00]">{s3TotalTb} TB</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={s3TotalTb}
                  onChange={(e) => setS3TotalTb(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Object Count: <span className="font-mono text-[#ff6b00]">{s3ObjectThousands}k objects</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={s3ObjectThousands}
                  onChange={(e) => setS3ObjectThousands(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="text-[11px] text-[#707070] font-mono mt-1">Monitoring fee: $0.0025/1k</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Cold Data Share (&gt;90d): <span className="font-mono text-[#ff6b00]">{coldShare}%</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="95"
                  step="5"
                  value={coldShare}
                  onChange={(e) => setColdShare(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="text-[11px] text-[#707070] font-mono mt-1">Archive instant access tier</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1f1f1f]">
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">S3 Standard Monthly Cost</div>
                <div className="text-xl font-mono font-bold text-white mt-1">${standardCost.toFixed(2)}</div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">Flat $0.023/GB</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Intelligent-Tiering Cost</div>
                <div className="text-xl font-mono font-bold text-[#ff6b00] mt-1">${tieredCost.toFixed(2)}</div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">Includes ${monitoringFee.toFixed(2)} monitor fee</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Net Monthly Savings</div>
                <div className="text-xl font-mono font-bold text-[#ff6b00] mt-1">${monthlySavings.toFixed(2)}<span className="text-xs text-[#a1a1a1]">/mo</span></div>
                <div className="text-[11px] text-[#a1a1a1] mt-1 font-mono">{((monthlySavings / standardCost) * 100).toFixed(1)}% savings</div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 10. Post-Credit Cliff */}
      {calculatorId === 'post-credit-cliff' && (() => {
        const burnRunwayMonths = monthlyBurn > 0 ? (creditBalance / monthlyBurn) : 0;
        const willExhaustEarly = burnRunwayMonths < monthsToCalendarExpiry;
        const exhaustionMonth = Math.min(burnRunwayMonths, monthsToCalendarExpiry);
        const optimizedBurn = monthlyBurn * 0.72; // ~28% savings with quick wins & SP
        const annualCashSaved = (monthlyBurn - optimizedBurn) * 12;

        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Remaining Credit Balance: <span className="font-mono text-[#ff6b00]">${creditBalance.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="2500"
                  value={creditBalance}
                  onChange={(e) => setCreditBalance(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Gross Monthly AWS Spend: <span className="font-mono text-[#ff6b00]">${monthlyBurn.toLocaleString()}/mo</span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="25000"
                  step="500"
                  value={monthlyBurn}
                  onChange={(e) => setMonthlyBurn(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#ededed] mb-1">
                  Calendar Expiry Horizon: <span className="font-mono text-[#ff6b00]">{monthsToCalendarExpiry} months</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="24"
                  step="1"
                  value={monthsToCalendarExpiry}
                  onChange={(e) => setMonthsToCalendarExpiry(Number(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1f1f1f]">
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Credit Exhaustion Date</div>
                <div className="text-xl font-mono font-bold text-white mt-1">In {exhaustionMonth.toFixed(1)} <span className="text-xs text-[#a1a1a1]">months</span></div>
                <div className={`text-[11px] mt-1 font-mono ${willExhaustEarly ? 'text-[#f59e0b]' : 'text-[#707070]'}`}>
                  {willExhaustEarly ? 'Exhausts before calendar date' : 'Reaches calendar expiration'}
                </div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Post-Credit Monthly Cash Shock</div>
                <div className="text-xl font-mono font-bold text-[#ef4444] mt-1">${monthlyBurn.toLocaleString()}<span className="text-xs text-[#a1a1a1]">/mo</span></div>
                <div className="text-[11px] text-[#707070] mt-1 font-mono">Immediate bank deduction</div>
              </div>
              <div className="bg-[#111111] p-4 rounded border border-[#1f1f1f]">
                <div className="text-xs text-[#a1a1a1]">Pre-Cliff Optimized Cash Burn</div>
                <div className="text-xl font-mono font-bold text-[#ff6b00] mt-1">${optimizedBurn.toFixed(0)}<span className="text-xs text-[#a1a1a1]">/mo</span></div>
                <div className="text-[11px] text-[#a1a1a1] mt-1 font-mono">Saves ${annualCashSaved.toFixed(0)}/yr cash</div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
