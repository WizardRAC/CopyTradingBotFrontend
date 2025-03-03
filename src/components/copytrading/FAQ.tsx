import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQ() {
  return (
    <Card className="bg-zinc-900 border-zinc-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white">Frequently Asked Questions</h3>
        <p className="text-sm text-zinc-400">To get you started with AI Snipers</p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="item-1" className="border-zinc-800">
          <AccordionTrigger className="text-zinc-100 hover:text-white hover:no-underline">
            Which tokens can the copy trading feature trade on WhalesX?
          </AccordionTrigger>
          <AccordionContent className="text-zinc-400">
            Our copy trading feature supports all tokens listed on major Solana DEXs. The system automatically verifies token legitimacy and liquidity before executing trades to ensure safety and optimal execution.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border-zinc-800">
          <AccordionTrigger className="text-zinc-100 hover:text-white hover:no-underline">
            My copy trading is not buying some tokens that my copy trader bought
          </AccordionTrigger>
          <AccordionContent className="text-zinc-400">
            This can happen for several reasons:
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>The token is already in your wallet holdings</li>
              <li>The trade amount is below your minimum threshold setting</li>
              <li>The trade amount exceeds your maximum buy amount setting</li>
              <li>Insufficient wallet balance at the time of trade</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border-zinc-800">
          <AccordionTrigger className="text-zinc-100 hover:text-white hover:no-underline">
            My Copy Trading Setup is slow and takes a lot of time
          </AccordionTrigger>
          <AccordionContent className="text-zinc-400">
            Trade execution speed can be affected by:
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Network congestion on Solana</li>
              <li>Low priority fee setting</li>
              <li>High market volatility</li>
            </ul>
            Try increasing your priority fee in the advanced settings for faster execution.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border-zinc-800">
          <AccordionTrigger className="text-zinc-100 hover:text-white hover:no-underline">
            What is Copy Trading Amount Invested?
          </AccordionTrigger>
          <AccordionContent className="text-zinc-400">
            The Copy Trading Amount Invested represents the total SOL allocated for copy trading. This amount is used to calculate position sizes for each trade based on your settings. It's important to ensure this amount matches your risk tolerance and trading strategy.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border-zinc-800">
          <AccordionTrigger className="text-zinc-100 hover:text-white hover:no-underline">
            Copy Trading Invested or PnL Amount Not Reflecting in Wallet
          </AccordionTrigger>
          <AccordionContent className="text-zinc-400">
            If you notice discrepancies:
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Check your wallet connection status</li>
              <li>Verify transaction history in Solscan</li>
              <li>Allow up to 5 minutes for updates during high network load</li>
              <li>Contact support if issues persist</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}